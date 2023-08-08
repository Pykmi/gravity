import Color from "./color";
import StationaryBall from "./orb";
import Player from "./player";

class Game {
  public ctx: CanvasRenderingContext2D;
  public player: Player;
  public stationaryBalls: StationaryBall[] = [];
  public windowWidth: number = 1024;
  public windowHeight: number = 786;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.player = new Player(this.windowHeight, this.windowWidth);
    
    this.stationaryBalls = Array.from({ length: 400 }).map(() => {
      return new StationaryBall(
        Math.random() * this.windowWidth,
        Math.random() * this.windowHeight,
        10,
        new Color()
      );
    });
  }

  borders() {
    this.ctx.strokeStyle = "#000"; // Change color as needed
    this.ctx.lineWidth = 2; // Change line thickness as needed

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.windowWidth, 0);
    this.ctx.lineTo(this.windowWidth, this.windowHeight);
    this.ctx.lineTo(0, this.windowHeight);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  centerPosition() {
    return [this.windowWidth / 2, this.windowHeight / 2];
  }

  private detectCollision(updatedBallPositionX: number, updatedBallPositionY: number) {
    for (let i = 0; i < this.stationaryBalls.length; i++) {
      const dx = updatedBallPositionX - this.stationaryBalls[i].x;
      const dy = updatedBallPositionY - this.stationaryBalls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      // Collision detected
      if (distance < this.player.radius + this.stationaryBalls[i].radius) {
        this.player.increaseSize();
  
        // at size 60 the player begins to move away from the mouse
        const sizeFactor = this.player.radius / 60;
  
        // adjust the reduction based on the ball's size
        const reduction = 0.001 * sizeFactor; 
        this.player.friction = Math.max(Player.minFraction, this.player.fraction - reduction);
  
        this.stationaryBalls.splice(i, 1);
      }
    }
  }

  private calculateTargetVelocity() {
    // Calculate the target velocities based on the current mouse position
    const [mousePositionX, mousePositionY] = this.player.mousePosition();
    const [centerWidthPosition, centerHeightPosition] = this.centerPosition();
  
    const targetVelocityX = mousePositionX - centerWidthPosition;
    const targetVelocityY = mousePositionY - centerHeightPosition;
  
    return [targetVelocityX, targetVelocityY];
  }

  private adjustVelocityTowardsTarget(targetVelocityX: number, targetVelocityY: number) {
    // Get the current velocities
    let [ballVelocityX, ballVelocityY] = this.player.velocity();
  
    // Gradually move the velocity towards the target
    ballVelocityX += (targetVelocityX - ballVelocityX) * Player.velocityChangeFactor;
    ballVelocityY += (targetVelocityY - ballVelocityY) * Player.velocityChangeFactor;
  
    // Limit the speed to maxSpeed
    const speed = Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY);
  
    if (speed > Player.maxSpeed) {
      ballVelocityX = (ballVelocityX / speed) * Player.maxSpeed;
      ballVelocityY = (ballVelocityY / speed) * Player.maxSpeed;
    }
  
    // Update the velocities
    this.player.updateVelocity(ballVelocityX, ballVelocityY);
  
    return [ballVelocityX, ballVelocityY];
  }

  private updatePlayerPosition(velocityX: number, velocityY: number) {
    // Get the current positions
    const [ballPositionX, ballPositionY] = this.player.position();
  
    // Calculate the new position based on the updated velocity
    const updatedBallPositionX = ballPositionX + velocityX;
    const updatedBallPositionY = ballPositionY + velocityY;
  
    if (this.player.isMoving) {
      // Update the position
      this.player.updatePosition(updatedBallPositionX, updatedBallPositionY);
    }
  
    return [updatedBallPositionX, updatedBallPositionY];
  }

  movePlayer() {
    const [targetVelocityX, targetVelocityY] = this.calculateTargetVelocity();

    const [velocityX, velocityY] = this.adjustVelocityTowardsTarget(
      targetVelocityX,
      targetVelocityY
    );

    const [updatedBallPositionX, updatedBallPositionY] = this.updatePlayerPosition(
      velocityX,
      velocityY
    );
    
    return [updatedBallPositionX, updatedBallPositionY];
  }

  update() {
    const [updatedBallPositionX, updatedBallPositionY] = this.movePlayer();
    this.detectCollision(updatedBallPositionX, updatedBallPositionY);
    
    this.draw();
    requestAnimationFrame(() => this.update());
  }

  draw() {
    const [ballPositionX, ballPositionY] = this.player.position();
    const xOffset = this.windowWidth / 2 - ballPositionX;
    const yOffset = this.windowHeight / 2 - ballPositionY;

    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);

    // Draw stationary balls
    for (const ball of this.stationaryBalls) {
      ball.draw(this.ctx, xOffset, yOffset);
    }

    // Draw player at the center of the canvas  
    this.ctx.fillStyle = this.player.color.toString();
    this.ctx.beginPath();
    this.ctx.arc(this.windowWidth / 2, this.windowHeight / 2, this.player.radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.borders();
  }

  start() {
    this.update();
  }
}

export default Game;
