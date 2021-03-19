// This random seed package was previously publicated on the Deno site as a standalone package but I've decided to just integrate it into the Uwuifier

export class Seed {
    private _seed: string;
    private _seeder: () => number;

    private generateRange(value: number, min: number, max: number): number {
        // Make sure the minimum and maximum values are correct
        if (min > max) throw new Error('The minimum value must be below the maximum value');
        else if (min === max) throw new Error('The minimum value cannot equal the maximum value');
        // Everything is run through the map value so if the defaults haven't changed just return
        else if (min === 0 && max === 1) return value;

        // Actually map the number range
        return ((value - 0) * (max - min)) / (1 - 0) + min;
    }

    private generateSeeder(seed: string): () => number {
        // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
        // This is a seeded random generator
        // Returns a function which returns a value between 0 and 0xFFFFFFFF (32-bits)

        let h = 1779033703 ^ seed.length;
        for (let i = 0; i < seed.length; i++)
            (h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));

        return () => {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
        };
    }

    set seed(seed: string) {
        // If the seed hasn't changed just return
        if (this._seed === seed) return;

        this._seed = seed;
        this._seeder = this.generateSeeder(seed);
    }

    get seed(): string {
        return this._seed;
    }

    constructor(seed = '') {
        this._seed = seed;
        this._seeder = this.generateSeeder(seed);
    }

    public random(min = 0, max = 1): number {
        // Use the default sfc32 random generator
        return this.generateRange(this.sfc32(), min, max);
    }

    public randomInt(min = 0, max = 1): number {
        return Math.round(this.random(min, max));
    }

    public sfc32(min = 0, max = 1): number {
        let a = this._seeder();
        let b = this._seeder();
        let c = this._seeder();
        let d = this._seeder();

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
        return this.generateRange((t >>> 0) / 4294967296, min, max);
    }

    public mulberry32(min = 0, max = 1): number {
        let a = this._seeder();
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return this.generateRange(((t ^ (t >>> 14)) >>> 0) / 4294967296, min, max);
    }

    public jsf32(min = 0, max = 1): number {
        let a = this._seeder();
        let b = this._seeder();
        let c = this._seeder();
        let d = this._seeder();

        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;

        const t = (a - ((b << 27) | (b >>> 5))) | 0;
        a = b ^ ((c << 17) | (c >>> 15));
        b = (c + d) | 0;
        c = (d + t) | 0;
        d = (a + t) | 0;
        return this.generateRange((d >>> 0) / 4294967296, min, max);
    }

    public xoshiro128(min = 0, max = 1): number {
        let a = this._seeder();
        let b = this._seeder();
        let c = this._seeder();
        let d = this._seeder();

        const t = b << 9;
        let r = a * 5;
        r = ((r << 7) | (r >>> 25)) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = (d << 11) | (d >>> 21);
        return this.generateRange((r >>> 0) / 4294967296, min, max);
    }
}
