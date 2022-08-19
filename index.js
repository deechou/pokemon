const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const offset = {
  x: -1000,
  y: -550,
};

class Boundary {
  static height = 48;
  static width = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }
  draw() {
    c.fillStyle = "rgba(255,0,0,0.0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

const boundaries = [];
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

// console.log(boundaries);

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
const bg = new Image();
bg.src = "./img/map400.png";

// console.log(bg.width);

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: bg,
});

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

const player = new Sprite({
  position: {
    // x: (canvas.width - playerImage.width / 4) / 2,
    // y: (canvas.height - playerImage.height) / 2,
    x: (canvas.width - playerImage.width / 4) / 2,
    y: (canvas.height - playerImage.height) / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
});

// console.log(player);
// console.log(player.image.width);
// console.log(player.width);

// console.log(background);
// (canvas.width - this.image.width) / 2,
// (canvas.height - this.image.height) / 2,

let moving = true;
const movables = [background, ...boundaries];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function handleCollision({
  offset = {
    x: 0,
    y: 0,
  },
}) {
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + offset.x,
            y: boundary.position.y + offset.y,
          },
        },
      })
    ) {
      console.log("colliding");
      moving = false;
      break;
    } else {
      moving = true;
    }
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();

  if (keys.w.pressed && lastKey === "w") {
    handleCollision({
      offset: {
        x: 0,
        y: 2,
      },
    });
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += 2;
      });
    }
  } else if (keys.a.pressed && lastKey === "a") {
    handleCollision({
      offset: {
        x: 2,
        y: 0,
      },
    });
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 2;
      });
    }
  } else if (keys.s.pressed && lastKey === "s") {
    handleCollision({
      offset: {
        x: 0,
        y: -2,
      },
    });
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 2;
      });
    }
  } else if (keys.d.pressed && lastKey === "d") {
    handleCollision({
      offset: {
        x: -2,
        y: 0,
      },
    });
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 2;
      });
    }
  }
}

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

animate();
