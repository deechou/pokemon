class Boundary {
  static height = 48;
  static width = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }
  draw() {
    c.fillStyle = "rgba(255,0,0,0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, current: 0, elapsed: 0 },
  }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };

    this.moving = false;
  }

  draw() {
    c.drawImage(
      this.image,
      this.frames.current * this.width,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 20 === 0) {
      if (this.frames.current < this.frames.max - 1) this.frames.current++;
      else this.frames.current = 0;
    }
  }
}

class HitBox {
  constructor({ position, width, height }) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  draw() {
    c.fillStyle = "rgba(0,0,255,0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
