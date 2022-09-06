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

const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBG,
});

const draggle = new Sprite({
  position: {
    x: 800,
    y: 100,
  },
  image: draggleImage,
  frames: {
    max: 4,
    current: 0,
    elapsed: 0,
  },
  animated: true,
});

const emby = new Sprite({
  position: {
    x: 280,
    y: 325,
  },
  image: embyImage,
  frames: {
    max: 4,
    current: 0,
    elapsed: 0,
  },
  animated: true,
});

const playerHitBox = new HitBox({
  position: {
    x: player.position.x,
    y: player.position.y + 34,
  },
  width: 48,
  height: 34,
});

console.log(player);

/*
World Initialization complete.
Animation code below
*/

const movables = [background, foreground, ...boundaries, ...tallGrass];
const battle = {
  initiated: false,
};

let moving = true;

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  // console.log(animationId);
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

  player.animated = false;

  if (battle.initiated) return;

  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    handleGrass({ animationId: animationId });
  }

  if (keys.w.pressed && lastKey === "w") {
    player.animated = true;
    playerImage.src = "./img/playerUp.png";

    handleCollision({ offset: { x: 0, y: 2 } });
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += 2;
      });
    }
  } else if (keys.a.pressed && lastKey === "a") {
    player.animated = true;
    playerImage.src = "./img/playerLeft.png";
    // handleCollision({ offset: { x: 2, y: 0 } });

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
    player.animated = true;
    playerImage.src = "./img/playerDown.png";

    handleCollision({ offset: { x: 0, y: -2 } });

    // handleCollision({
    //   offset: {
    //     x: 0,
    //     y: -2,
    //   },
    // });
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 2;
      });
    }
  } else if (keys.d.pressed && lastKey === "d") {
    player.animated = true;
    playerImage.src = "./img/playerRight.png";

    handleCollision({ offset: { x: -2, y: 0 } });

    // handleCollision({
    //   offset: {
    //     x: -2,
    //     y: 0,
    //   },
    // });

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 2;
      });
    }
  }
}

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  draggle.draw();
  emby.draw();
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

// animate();
animateBattle();
