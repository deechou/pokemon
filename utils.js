function calculateIntersection({ rectangle1, rectangle2 }) {
  let height = 0;
  let width = 0;

  //   console.log(rectangle1);
  //   console.log(rectangle2);

  width = Math.min(
    Math.abs(rectangle2.position.x + rectangle2.width - rectangle1.position.x),
    Math.abs(rectangle1.position.x + rectangle1.width - rectangle2.position.x)
  );

  height = Math.min(
    Math.abs(rectangle2.position.y + rectangle2.height - rectangle1.position.y),
    Math.abs(rectangle1.position.y + rectangle1.height - rectangle2.position.y)
  );
  //   console.log(width);
  //   console.log(height);
  //   console.log(width * height);
  return width * height;
}

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
      moving = false;
      break;
    } else {
      moving = true;
    }
  }
}

function handleGrass({ animationId }) {
  for (let i = 0; i < tallGrass.length; i++) {
    const grassPatch = tallGrass[i];
    if (
      rectangularCollision({
        rectangle1: playerHitBox,
        rectangle2: grassPatch,
      }) &&
      Math.random() < encounterChance
    ) {
      console.log("Battle Initiated!");
      window.cancelAnimationFrame(animationId);
      battle.initiated = true;
      flashScreen();
      break;
    }
  }
}

function flashScreen() {
  gsap.to("#overlappingDiv", {
    opacity: 1,
    repeat: 3,
    yoyo: true,
    duration: 0.3,
    onComplete() {
      gsap.to("#overlappingDiv", {
        opacity: 1,
        duration: 0.3,
      });
    },
  });
}
