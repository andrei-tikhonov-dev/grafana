class ColorManager {
  private static instance: ColorManager;
  private colorMap: Map<string | number, number>;
  private colors: string[];
  private nextIndex: number;

  private constructor(colors: string[]) {
    this.colorMap = new Map();
    this.colors = colors;
    this.nextIndex = 0;
  }

  public static getInstance(colors?: string[]): ColorManager {
    if (!ColorManager.instance) {
      if (!colors || colors.length === 0) {
        throw new Error('An array of colors is required when first creating a ColorManager');
      }
      ColorManager.instance = new ColorManager(colors);
    }
    return ColorManager.instance;
  }

  public getColorForId(id: string | number): string {
    if (this.colorMap.has(id)) {
      const colorIndex = this.colorMap.get(id)!;
      return this.colors[colorIndex];
    }

    const colorIndex = this.nextIndex % this.colors.length;
    this.colorMap.set(id, colorIndex);
    this.nextIndex++;

    return this.colors[colorIndex];
  }
}

export default ColorManager;
