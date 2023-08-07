import StationaryBall from "./orb";
import Player from "./player";

class Game {
  public ctx: CanvasRenderingContext2D;
  public player: Player;
  public stationaryBalls: StationaryBall[] = [];
  public windowWidth: number = 800;
  public windowHeight: number = 600;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.player = new Player(this.windowHeight, this.windowWidth);
    this.initStationaryBalls();
  }

  initStationaryBalls() {
    this.stationaryBalls = Array.from({ length: 100 }).map(() => {
      const x = Math.random() * this.windowWidth;
      const y = Math.random() * this.windowHeight;
      const radius = 10;
      const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      return new StationaryBall(x, y, radius, color);
    });
  }

  update() {
    // Move the ball based on its velocity
    const [ballVelocityX, ballVelocityY] = this.player.velocity();
    const [ballPositionX, ballPositionY] = this.player.position();

    const updatedBallPositionX = ballPositionX + ballVelocityX;
    const updatedBallPositionY = ballPositionY + ballVelocityY;

    this.player.updatePositionX(updatedBallPositionX);
    this.player.updatePositionY(updatedBallPositionY);

    // Apply friction to slow the ball down over time
    this.player.updateVelocityX(ballVelocityX * this.player.friction);
    this.player.updateVelocityY(ballVelocityY * this.player.friction);

    for (let i = 0; i < this.stationaryBalls.length; i++) {
      const dx = updatedBallPositionX - this.stationaryBalls[i].x;
      const dy = updatedBallPositionY - this.stationaryBalls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.player.radius + this.stationaryBalls[i].radius) {
        // Collision detected
        this.player.radius += 1;

        // at size 60 the player begins to move away from the mouse
        const sizeFactor = this.player.radius / 60;

        // adjust the reduction based on the ball's size
        const reduction = 0.001 * sizeFactor; 
        this.player.fraction = Math.max(Player.minFraction, this.player.fraction - reduction);

        this.stationaryBalls.splice(i, 1);
      }
    }

    this.draw();
    requestAnimationFrame(() => this.update());
  }

  draw() {
    const [ballPositionX, ballPositionY] = this.player.position();

    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
    this.ctx.fillStyle = this.player.color;
    this.ctx.beginPath();
    this.ctx.arc(ballPositionX, ballPositionY, this.player.radius, 0, Math.PI * 2);
    this.ctx.fill();

    for (const ball of this.stationaryBalls) {
      ball.draw(this.ctx);
    }
  }

  start() {
    this.update();
  }
}

export default Game;
