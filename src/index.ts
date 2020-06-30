'use strict';

import { getElement, getRandomInt, getCapitalPercentage, InitModifierParam, isUri } from './utils';

interface SpacesModifier {
  facePercentage: number;
  actionPercentage: number;
  stutterPercentage: number;
}

export class Uwuifier {
  public faces: string[] = [`(・\`ω´・)`, `;;w;;`, `owo`, `UwU`, `>w<`, `^w^`, `ÚwÚ`, `:3`, `x3`];
  public exclimations: string[] = [`?!!`, `?!?1`, `!!11`, `?!?!`, `!?`];
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
  private _exclimationsModifier: number;

  constructor(
    {
      spacesModifierParam = { facePercentage: 0.05, actionPercentage: 0.05, stutterPercentage: 0.1 },
      wordsModifierParam = 1,
      exclimationsModifierParam = 1
    } = {
      spacesModifierParam: { facePercentage: 0.05, actionPercentage: 0.05, stutterPercentage: 0.1 },
      wordsModifierParam: 1,
      exclimationsModifierParam: 1
    }
  ) {
    this._spacesModifier = spacesModifierParam || {
      facePercentage: 0.05,
      actionPercentage: 0.05,
      stutterPercentage: 0.1
    };
    this._wordsModifier = wordsModifierParam || 1;
    this._exclimationsModifier = exclimationsModifierParam || 1;
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
          const random = Math.random();

          // Generate a random value for every map so words will be partly uwuified instead of not at all
          if (random <= this._wordsModifier) {
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

    const faceThreshold = this._spacesModifier.facePercentage;
    const actionThreshold = this._spacesModifier.actionPercentage + faceThreshold;
    const stutterThreshold = this._spacesModifier.stutterPercentage + actionThreshold;

    words.forEach((wordValue, wordIndex) => {
      // TODO: use seed value
      const random = Math.random();

      let insertedExpression = false;
      let removeCapital = false;

      if (random <= faceThreshold && this.faces.length) {
        // Add random face before the word
        uwuifiedSentence += ` ${getElement(this.faces)}`;
        insertedExpression = true;
      } else if (random <= actionThreshold && this.actions.length) {
        // Add random action before the word
        uwuifiedSentence += ` ${getElement(this.actions)}`;
        insertedExpression = true;
      } else if (random <= stutterThreshold) {
        // If first character is defined and string isn't a URI
        if (wordValue[0] && !isUri(wordValue)) {
          const letter = wordValue[0];
          // Add stutter with a length between 0 and 2
          const stutter = getRandomInt(0, 2);

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

  public uwuifyExclimations(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);
    const pattern = new RegExp('[?!]+$');

    words.forEach((wordValue, wordIndex) => {
      const random = Math.random();

      // If there are exclimations replace them
      if (pattern.test(wordValue) && random <= this._exclimationsModifier) {
        wordValue = wordValue.replace(pattern, ``);
        wordValue += getElement(this.exclimations);
      }

      // Reconstruct the string
      uwuifiedSentence += wordIndex === 0 ? wordValue : ` ${wordValue}`;
    });

    return uwuifiedSentence;
  }

  public uwuifySentence(sentence: string): string {
    let uwuifiedString = sentence;

    uwuifiedString = this.uwuifyWords(uwuifiedString);
    uwuifiedString = this.uwuifyExclimations(uwuifiedString);
    uwuifiedString = this.uwuifySpaces(uwuifiedString);

    return uwuifiedString;
  }
}
