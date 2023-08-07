class Player {
    public color = "0";
    public fraction = 0.05;
    public friction = 0.98;
    public radius = 10;

    public static readonly minVelocity = 1;
    public static readonly minFraction = 0.05;

    private velocityX = 0;
    private velocityY = 0;

    private positionX: number;
    private positionY: number;

    constructor(gameWindowHeight: number, gameWindowWidth: number) {
        this.positionX = gameWindowWidth / 2;
        this.positionY = gameWindowHeight / 2;

        this.selectPlayerColor();
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

    updatePositionX(value: number): void {
        this.positionX = value;
    }

    updatePositionY(value: number): void {
        this.positionY = value;
    }

    updateVelocityX(value: number): void {
        if (Math.abs(value) < Player.minVelocity) {
            this.velocityX = value < 0 ? -Player.minVelocity : Player.minVelocity;
        } else {
            this.velocityX = value;
        }
    }

    updateVelocityY(value: number): void {
        if (Math.abs(value) < Player.minVelocity) {
            this.velocityY = value < 0 ? -Player.minVelocity : Player.minVelocity;
        } else {
            // console.log("VALUE: ", value)
            this.velocityY = value;
        }
    }

    velocity(): number[] {
        return [this.velocityX, this.velocityY];
    }
}

export default Player;
