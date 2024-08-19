import Seed from "./seed.ts";
import { getCapitalPercentage, isAt, isUri } from "./utils.ts";

interface SpacesModifier {
  faces: number;
  actions: number;
  stutters: number;
}

export const DEFAULTS = {
  WORDS: 1,
  SPACES: { faces: 0.05, actions: 0.075, stutters: 0.1 },
  EXCLAMATIONS: 1,
};

export default class Uwuifier {
  public faces: string[] = [
    "(・`ω´・)",
    ";;w;;",
    "OwO",
    "UwU",
    ">w<",
    "^w^",
    "ÚwÚ",
    "^-^",
    ":3",
    "x3",
  ];

  public exclamations: string[] = ["!?", "?!!", "?!?1", "!!11", "?!?!"];

  public actions: string[] = [
    "*blushes*",
    "*whispers to self*",
    "*cries*",
    "*screams*",
    "*sweats*",
    "*twerks*",
    "*runs away*",
    "*screeches*",
    "*walks away*",
    "*sees bulge*",
    "*looks at you*",
    "*notices buldge*",
    "*starts twerking*",
    "*huggles tightly*",
    "*boops your nose*",
  ];

  public uwuMap = [
    [/(?:r|l)/g, "w"],
    [/(?:R|L)/g, "W"],
    [/n([aeiou])/g, "ny$1"],
    [/N([aeiou])/g, "Ny$1"],
    [/N([AEIOU])/g, "Ny$1"],
    [/ove/g, "uv"],
  ];

  private _wordsModifier: number = DEFAULTS.WORDS;
  private _spacesModifier: SpacesModifier = DEFAULTS.SPACES;
  private _exclamationsModifier: number = DEFAULTS.EXCLAMATIONS;

  constructor(
    {
      words = DEFAULTS.WORDS,
      spaces = DEFAULTS.SPACES,
      exclamations = DEFAULTS.EXCLAMATIONS,
    } = {
      words: DEFAULTS.WORDS,
      spaces: DEFAULTS.SPACES,
      exclamations: DEFAULTS.EXCLAMATIONS,
    },
  ) {
    this.wordsModifier = words;
    this.spacesModifier = spaces;
    this.exclamationsModifier = exclamations;
  }

  public get wordsModifier(): number {
    return this._wordsModifier;
  }

  public set wordsModifier(value: number) {
    if (value < 0 || value > 1) {
      throw new Error("wordsModifier value must be a number between 0 and 1");
    }
    this._wordsModifier = value;
  }

  public get spacesModifier(): SpacesModifier {
    return this._spacesModifier;
  }

  public set spacesModifier(value: SpacesModifier) {
    const sum = Object.values(value).reduce((a, b) => a + b);
    if (sum < 0 || sum > 1) {
      throw new Error("spacesModifier value must be a number between 0 and 1");
    }
    this._spacesModifier = value;
  }

  public get exclamationsModifier(): number {
    return this._exclamationsModifier;
  }

  public set exclamationsModifier(value: number) {
    if (value < 0 || value > 1) {
      throw new Error(
        "exclamationsModifier value must be a number between 0 and 1",
      );
    }
    this._exclamationsModifier = value;
  }

  public uwuifyWords(sentence: string): string {
    const words = sentence.split(" ");

    const uwuifiedSentence = words
      .map((word) => {
        if (isAt(word)) return word;
        if (isUri(word)) return word;

        const seed = new Seed(word);

        for (const [oldWord, newWord] of this.uwuMap) {
          // Generate a random value for every map so words will be partly uwuified instead of not at all
          if (seed.random() > this._wordsModifier) continue;

          word = word.replace(oldWord, newWord as string);
        }

        return word;
      })
      .join(" ");

    return uwuifiedSentence;
  }

  public uwuifySpaces(sentence: string): string {
    const words = sentence.split(" ");

    const faceThreshold = this._spacesModifier.faces;
    const actionThreshold = this._spacesModifier.actions + faceThreshold;
    const stutterThreshold = this._spacesModifier.stutters + actionThreshold;

    const uwuifiedSentence = words
      .map((word, index) => {
        const seed = new Seed(word);
        const random = seed.random();

        const [firstCharacter] = word;

        if (random <= faceThreshold && this.faces) {
          // Add random face before the word
          word += " " + this.faces[seed.randomInt(0, this.faces.length - 1)];
          checkCapital();
        } else if (random <= actionThreshold && this.actions) {
          // Add random action before the word
          word += " " +
            this.actions[seed.randomInt(0, this.actions.length - 1)];
          checkCapital();
        } else if (random <= stutterThreshold && !isUri(word)) {
          // Add stutter with a length between 0 and 2
          const stutter = seed.randomInt(0, 2);
          return (firstCharacter + "-").repeat(stutter) + word;
        }

        function checkCapital() {
          // Check if we should remove the first capital letter
          if (firstCharacter !== firstCharacter.toUpperCase()) return;
          // if word has higher than 50% upper case
          if (getCapitalPercentage(word) > 0.5) return;

          // If it's the first word
          if (index === 0) {
            // Remove the first capital letter
            word = firstCharacter.toLowerCase() + word.slice(1);
          } else {
            const previousWord = words[index - 1];
            const previousWordLastChar = previousWord[previousWord.length - 1];
            const prevWordEndsWithPunctuation = new RegExp("[.!?\\-]").test(
              previousWordLastChar,
            );

            if (!prevWordEndsWithPunctuation) return;
            word = firstCharacter.toLowerCase() + word.slice(1);
          }
        }

        return word;
      })
      .join(" ");

    return uwuifiedSentence;
  }

  public uwuifyExclamations(sentence: string): string {
    const words = sentence.split(" ");
    const pattern = new RegExp("[?!]+$");

    const uwuifiedSentence = words
      .map((word) => {
        const seed = new Seed(word);

        // If there are no exclamations return
        if (!pattern.test(word) || seed.random() > this._exclamationsModifier) {
          return word;
        }

        word = word.replace(pattern, "");
        word +=
          this.exclamations[seed.randomInt(0, this.exclamations.length - 1)];

        return word;
      })
      .join(" ");

    return uwuifiedSentence;
  }

  public uwuifySentence(sentence: string): string {
    let uwuifiedString = sentence;

    uwuifiedString = this.uwuifyWords(uwuifiedString);
    uwuifiedString = this.uwuifyExclamations(uwuifiedString);
    uwuifiedString = this.uwuifySpaces(uwuifiedString);

    return uwuifiedString;
  }
}
