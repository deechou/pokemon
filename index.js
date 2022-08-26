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

const tallGrass = [];
battlezonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      tallGrass.push(
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

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: bg,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: fg,
});

const player = new Sprite({
  position: {
    x: (canvas.width - playerImage.width / 4) / 2,
    y: (canvas.height - playerImage.height) / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
    current: 0,
    elapsed: 0,
  },
});

console.log(player);

let moving = true;
const movables = [background, foreground, ...boundaries, ...tallGrass];

const playerHitBox = new HitBox({
  position: {
    x: player.position.x,
    y: player.position.y + 34,
  },
  width: 48,
  height: 34,
});
console.log(playerHitBox);

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
        rectangle1: playerHitBox,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + offset.x,
            y: boundary.position.y + offset.y,
          },
        },
      })
    ) {
      // console.log("colliding");
      moving = false;
      break;
    } else {
      moving = true;
    }
  }

  for (let i = 0; i < tallGrass.length; i++) {
    const grassPatch = tallGrass[i];
    if (
      rectangularCollision({
        rectangle1: playerHitBox,
        rectangle2: {
          ...grassPatch,
          position: {
            x: grassPatch.position.x,
            y: grassPatch.position.y,
          },
        },
      })
    ) {
      console.log("Grass collision");
    }
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  tallGrass.forEach((boundary) => {
    boundary.draw();
  });

  playerHitBox.draw();
  player.draw();

  foreground.draw();
  player.moving = false;
  if (keys.w.pressed && lastKey === "w") {
    player.moving = true;
    playerImage.src = "./img/playerUp.png";

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
    player.moving = true;
    playerImage.src = "./img/playerLeft.png";

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
    player.moving = true;
    playerImage.src = "./img/playerDown.png";

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
    player.moving = true;
    playerImage.src = "./img/playerRight.png";

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
