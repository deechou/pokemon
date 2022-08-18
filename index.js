const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

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
    c.fillStyle = "red";
    c.fillRect(
      this.position.x + offset.x,
      this.position.y + offset.y,
      this.width,
      this.height
    );
  }
}

const testBoundary = new Boundary();
const movables = [background, testBoundary];
const boundaries = [];

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
        })
      );
    }
  });
});

console.log(boundaries);

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const bg = new Image();
bg.src = "./img/map400.png";
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: bg,
});

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  //   boundaries.forEach((boundary) => {
  //     boundary.draw();
  //   });

  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    (canvas.width - playerImage.width) / 2,
    (canvas.height - playerImage.height) / 2,
    playerImage.width / 4,
    playerImage.height
  );

  if (keys.w.pressed && lastKey === "w") background.position.y += 2;
  else if (keys.a.pressed && lastKey === "a") background.position.x += 2;
  else if (keys.s.pressed && lastKey === "s") background.position.y -= 2;
  else if (keys.d.pressed && lastKey === "d") background.position.x -= 2;
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
