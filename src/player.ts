class Player {
  public color = "0";
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

    this.selectPlayerColor();
  }

  increaseSize(): void {
    this.radius += Player.incr;
  }

  position(): number[] {
    return [this.positionX, this.positionY];
  }

  selectPlayerColor(): void {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    this.color = `rgb(${r},${g},${b})`;
  }

  toggleMoving() {
    this.isMoving = !this.isMoving;
  }

  updateMousePosition(xValue: number, yValue: number) {
    this.mousePositionX = xValue;
    this.mousePositionY = yValue;
  }

  mousePosition(): number[] {
    return [this.mousePositionX, this.mousePositionY];
  }

  updatePositionX(value: number): void {
    this.positionX = value;
  }

  updatePositionY(value: number): void {
    this.positionY = value;
  }

  updateVelocityX(newVelocityX: number) {
    const speed = Math.sqrt(newVelocityX * newVelocityX + this.velocityY * this.velocityY);

    if (speed > Player.maxSpeed) {
      newVelocityX = (newVelocityX / speed) * Player.maxSpeed;
    }

    this.velocityX = newVelocityX;
  }

  updateVelocityY(newVelocityY: number) {
    const speed = Math.sqrt(this.velocityX * this.velocityX + newVelocityY * newVelocityY);

    if (speed > Player.maxSpeed) {
      newVelocityY = (newVelocityY / speed) * Player.maxSpeed;
    }

    this.velocityY = newVelocityY;
  }

  updateTargetVelocityX(newVelocityX: number) {
    this.targetVelocityX = newVelocityX;
  }
  
  updateTargetVelocityY(newVelocityY: number) {
    this.targetVelocityY = newVelocityY;
  }

  targetVelocity(): number[] {
    return [this.targetVelocityX, this.targetVelocityY];
  }

  velocity(): number[] {
    return [this.velocityX, this.velocityY];
  }
}

export default Player;
