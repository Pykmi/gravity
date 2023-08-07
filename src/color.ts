class Color {
  private blue: string;
  private green: string;
  private red: string;

  constructor(red?: string, green?: string, blue?: string) {
    if (!red || !green || !blue) {
      this.blue = this.random();
      this.green = this.random();
      this.red = this.random();
    } else {
      this.blue = blue;
      this.green = green;
      this.red = red;
    }
  }

  random(): string {
    return `${Math.random() * 255}`;
  }

  toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}

export default Color;
