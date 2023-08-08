import Game from "./game";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const game = new Game(ctx);

window.addEventListener("click", () => {
  // toggle movement
  if (game.player.isMoving) {
    game.player.toggleMoving();
  }
});

window.addEventListener("mousemove", ev => {
  const rect = canvas.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;

  // toggle movement
  if (!game.player.isMoving) {
    game.player.toggleMoving();
  }

  // Update the mouse position
  game.player.updateMousePosition(x, y);
  game.player.updateTargetVelocity(x, y);
});

// START GAME
game.start();
