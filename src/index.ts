'use strict';

import { getCapitalPercentage, InitModifierParam, isUri } from './utils';
import { Seed } from './seed';

interface SpacesModifier {
  faces: number;
  actions: number;
  stutters: number;
}

export class Uwuifier {
  public faces: string[] = [`(・\`ω´・)`, `;;w;;`, `owo`, `UwU`, `>w<`, `^w^`, `ÚwÚ`, `:3`, `x3`];
  public exclamations: string[] = [`?!!`, `?!?1`, `!!11`, `?!?!`, `!?`];
  public actions: string[] = [
    `*blushes*`,
    `*whispers to self*`,
    `*sweats*`,
    `*sees buldge*`,
    `*runs away*`,
    `*huggles tightly*`,
    `*boops your nose*`,
    `*starts twerking*`
  ];

  @InitModifierParam()
  private _spacesModifier: SpacesModifier;
  @InitModifierParam()
  private _wordsModifier: number;
  @InitModifierParam()
  private _exclamationsModifier: number;

  constructor(
    {
      spaces = { faces: 0.05, actions: 0.075, stutters: 0.1 },
      words = 1,
      exclamations = 1
    } = {
      spaces: { faces: 0.05, actions: 0.075, stutters: 0.1 },
      words: 1,
      exclamations: 1
    }
  ) {
    this._spacesModifier = spaces || {
      faces: 0.05,
      actions: 0.075,
      stutters: 0.1
    };
    this._wordsModifier = words || 1;
    this._exclamationsModifier = exclamations || 1;
  }

  public uwuifyWords(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);
    const uwuMap = [
      [/(?:r|l)/g, `w`],
      [/(?:R|L)/g, `W`],
      [/n([aeiou])/g, `ny$1`],
      [/N([aeiou])/g, `Ny$1`],
      [/N([AEIOU])/g, `Ny$1`],
      [/ove/g, `uv`]
    ];

    words.forEach((wordValue, wordIndex) => {
      // If word is a URI don't uwuifiy it
      if (!isUri(wordValue)) {
        for (const [oldWord, newWord] of uwuMap) {
          const seed = new Seed(wordValue);

          // Generate a random value for every map so words will be partly uwuified instead of not at all
          if (seed.random() <= this._wordsModifier) {
            wordValue = wordValue.replace(oldWord, newWord as string);
          }
        }
      }

      // Reconstruct the string with uwuified words
      uwuifiedSentence += wordIndex === 0 ? wordValue : ` ${wordValue}`;
    });

    return uwuifiedSentence;
  }

  public uwuifySpaces(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);

    const faceThreshold = this._spacesModifier.faces;
    const actionThreshold = this._spacesModifier.actions + faceThreshold;
    const stutterThreshold = this._spacesModifier.stutters + actionThreshold;

    words.forEach((wordValue, wordIndex) => {
      const seed = new Seed(wordValue);
      const random = seed.random();

      let insertedExpression = false;
      let removeCapital = false;

      if (random <= faceThreshold && this.faces.length) {
        // Add random face before the word
        uwuifiedSentence += ` ${this.faces[Math.round(seed.random(0, this.faces.length - 1))]}`;
        insertedExpression = true;
      } else if (random <= actionThreshold && this.actions.length) {
        // Add random action before the word
        uwuifiedSentence += ` ${this.actions[Math.round(seed.random(0, this.actions.length - 1))]}`;
        insertedExpression = true;
      } else if (random <= stutterThreshold) {
        // If first character is defined and string isn't a URI
        if (wordValue[0] && !isUri(wordValue)) {
          const letter = wordValue[0];
          // Add stutter with a length between 0 and 2
          const stutter = Math.round(seed.random(0, 2));

          for (let i = 0; i < stutter; i++) {
            wordValue = `${letter}-${wordValue}`;
          }
        }
      }

      // If we added a face or action
      if (insertedExpression) {
        // Check if we should remove the first capital letter
        if (wordValue[0] && wordValue[0] === wordValue[0].toUpperCase()) {
          if (wordIndex === 0) {
            // If it's the first word and has less than 50% upper case
            removeCapital = getCapitalPercentage(wordValue) <= 0.5;
          }

          if (wordIndex !== 0) {
            const previousWord = words[wordIndex - 1];
            const previousWordLast = previousWord[previousWord.length - 1];
            const punctuationRegex = new RegExp('[.!?\\-]');
            // If the previous word ends with punctuation continue with the logic
            if (punctuationRegex.test(previousWordLast)) {
              // If the current word has less than 50% upper case
              removeCapital = getCapitalPercentage(wordValue) <= 0.5;
            }
          }
        }
      }

      // Remove the first capital letter if needed
      wordValue = removeCapital ? `${wordValue.charAt(0).toLowerCase()}${wordValue.slice(1)}` : wordValue;

      // Reconstruct the string
      uwuifiedSentence += wordIndex === 0 ? wordValue : ` ${wordValue}`;
    });

    return uwuifiedSentence;
  }

  public uwuifyExclamations(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);
    const pattern = new RegExp('[?!]+$');

    words.forEach((wordValue, wordIndex) => {
      const seed = new Seed(wordValue);

      // If there are exclamations replace them
      if (pattern.test(wordValue) && seed.random() <= this._exclamationsModifier) {
        wordValue = wordValue.replace(pattern, ``);
        wordValue += this.exclamations[Math.round(seed.random(0, this.exclamations.length - 1))];
      }

      // Reconstruct the string
      uwuifiedSentence += wordIndex === 0 ? wordValue : ` ${wordValue}`;
    });

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
