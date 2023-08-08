import Color from "./color";

class Player {
  public color: Color;
  public fraction = 0.05;
  public friction = 0.98;
  public radius = 10;

  public static readonly minVelocity = 0.3;
  public static readonly minFraction = 0.05;
  public static readonly velocityChangeFactor = 0.1; // Control the rate of change in velocity
  public static readonly maxSpeed = 7;

  private static readonly incr = 0.15;

  private mousePositionX: number = 0;
  private mousePositionY: number = 0;
  private velocityX = 0;
  private velocityY = 0;
  private targetVelocityX = 0;
  private targetVelocityY = 0;

  private positionX: number;
  private positionY: number;

  public isMoving: boolean = false;

  constructor(gameWindowHeight: number, gameWindowWidth: number) {
    this.positionX = gameWindowWidth / 2;
    this.positionY = gameWindowHeight / 2;

    this.color = new Color();
  }

  private calculateSpeed(current: number, updated: number) {
    const speed = Math.sqrt(updated * updated + current * current);

    if (speed > Player.maxSpeed) {
      return (updated / speed) * Player.maxSpeed;
    }

    return updated;
  }

  increaseSize(): void {
    this.radius += Player.incr;
  }

  mousePosition(): number[] {
    return [this.mousePositionX, this.mousePositionY];
  }

  position(): number[] {
    return [this.positionX, this.positionY];
  }

  toggleMoving() {
    this.isMoving = !this.isMoving;
  }

  updateMousePosition(xValue: number, yValue: number) {
    this.mousePositionX = xValue;
    this.mousePositionY = yValue;
  }

  updatePosition(xValue: number, yValue: number) {
    this.positionX = xValue;
    this.positionY = yValue;
  }

  updateVelocity(xValue: number, yValue: number) {
    this.velocityX = this.calculateSpeed(this.velocityX, xValue);
    this.velocityY = this.calculateSpeed(this.velocityY, yValue);
  }

  updateTargetVelocity(xValue: number, yValue: number) {
    this.targetVelocityX = xValue;
    this.targetVelocityY = yValue;
  }

  targetVelocity(): number[] {
    return [this.targetVelocityX, this.targetVelocityY];
  }

  velocity(): number[] {
    return [this.velocityX, this.velocityY];
  }
}

export default Player;
