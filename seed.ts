export default class Seed {
  private seeder: () => number;

  constructor(seed: string) {
    this.seeder = this.xmur3(seed);
  }

  public random(min = 0, max = 1): number {
    // Make sure the minimum and maximum values are correct
    if (min > max) {
      throw new Error("The minimum value must be below the maximum value");
    }
    if (min === max) {
      throw new Error("The minimum value cannot equal the maximum value");
    }

    return this.denormalize(this.sfc32(), min, max);
  }

  public randomInt(min = 0, max = 1): number {
    return Math.round(this.random(min, max));
  }

  private denormalize(value: number, min: number, max: number): number {
    return value * (max - min) + min;
  }

  // https://github.com/bryc/code/blob/master/jshash/PRNGs.md
  private xmur3(str: string): () => number {
    let h = 1779033703 ^ str.length;

    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }

    return () => {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  // https://github.com/bryc/code/blob/master/jshash/PRNGs.md
  private sfc32(): number {
    let a = this.seeder();
    let b = this.seeder();
    let c = this.seeder();
    let d = this.seeder();

    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  }
}
