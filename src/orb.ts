import Color from "./color";

class StationaryBall {
  public x: number;
  public y: number;
  public radius: number;
  public color: Color;

  constructor(x: number, y: number, radius: number, color: Color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number) {
    ctx.beginPath();
    ctx.arc(this.x + xOffset, this.y + yOffset, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color.toString();
    ctx.fill();
    ctx.closePath();
  }
}

export default StationaryBall;
