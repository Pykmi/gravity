import Game from "./game";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const game = new Game(ctx);

canvas.addEventListener("mousemove", function(ev) {
  // Calculate difference between ball and mouse position
  const [ballPositionX, ballPositionY] = game.player.position();

  const diffX = ev.offsetX - ballPositionX;
  const diffY = ev.offsetY - ballPositionY;

  // Set the velocity in the direction of the mouse movement
  game.player.updateVelocityX(diffX * game.player.fraction);
  game.player.updateVelocityY(diffY * game.player.fraction);
});

game.start();
