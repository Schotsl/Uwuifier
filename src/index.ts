'use strict';

import { getElement, getRandomInt, getCapitalPercentage } from './utils';

interface spaceModifier {
  facePercentage: number;
  actionPercentage: number;
  stutterPercentage: number;
}

export class Uwuifier {
  public faces: string[] = [`(・\`ω´・)`, `;;w;;`, `owo`, `UwU`, `>w<`, `^w^`, `ÚwÚ`, `:3`, `x3`];
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
  public exclimations: string[] = [`?!!`, `?!?1`, `!!11`, `?!?!`, `!?`];

  private wordsModifier: number = 1;
  private spacesModifier: spaceModifier = { facePercentage: 0.05, actionPercentage: 0.05, stutterPercentage: 0.1 };
  private exclimationsModifier: number = 1;

  public uwuifyWords(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);
    const random = Math.random();
    const pattern = new RegExp(/(?:https?|ftp):\/\/[\n\S]+/g);

    words.forEach((wordValue) => {
      // If word is a URL don't uwuifiy it
      if (pattern.test(wordValue)) {
        if (random <= this.wordsModifier) wordValue = wordValue.replace(/(?:r|l)/g, `w`);
        if (random <= this.wordsModifier) wordValue = wordValue.replace(/(?:R|L)/g, `W`);
        if (random <= this.wordsModifier) wordValue = wordValue.replace(/n([aeiou])/g, `ny$1`);
        if (random <= this.wordsModifier) wordValue = wordValue.replace(/N([aeiou])/g, `Ny$1`);
        if (random <= this.wordsModifier) wordValue = wordValue.replace(/N([AEIOU])/g, `Ny$1`);
        if (random <= this.wordsModifier) wordValue = wordValue.replace(/ove/g, `uv`);
      }

      // Reconstruct the string with uwuified words
      uwuifiedSentence += ` ${wordValue}`;
    });

    return uwuifiedSentence;
  }

  public uwuifySpaces(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);

    words.forEach((wordValue, wordIndex) => {
      // TODO: use seed value
      const random = Math.random();

      let insertedExpression = false;
      let removeCapital = false;

      const faceThreshold = this.spacesModifier.facePercentage;
      const actionThreshold = this.spacesModifier.actionPercentage + faceThreshold;
      const stutterThreshold = this.spacesModifier.stutterPercentage + actionThreshold;

      if (random <= faceThreshold && this.faces.length) {
        // Add random face before the word
        uwuifiedSentence += ` ${getElement(this.faces)}`;
        insertedExpression = true;
      } else if (random <= actionThreshold && this.actions.length) {
        // Add random action before the word
        uwuifiedSentence += ` ${getElement(this.actions)}`;
        insertedExpression = true;
      } else if (random <= stutterThreshold) {
        // Add stutter with a length between 0 and 2 length
        const letter = wordValue[0];
        const stutter = getRandomInt(0, 2);

        for (let i = 0; i < stutter; i++) {
          wordValue = `${letter}-${wordValue}`;
        }
      }

      // If we added a face or action
      if (insertedExpression) {
        // Check if we should remove the first capital letter
        if (wordValue[0] === wordValue[0].toUpperCase()) {
          if (wordIndex === 0) {
            // If it's the first word and has less than 50% upper case
            if (getCapitalPercentage(wordValue) <= 0.5) removeCapital = true;
          }

          if (wordIndex !== 0) {
            // If the previous word ends with punctuation continue with the logic
            const previousWord = words[wordIndex - 1];
            const previousWordLast = previousWord[previousWord.length - 1];

            if (new RegExp('[.!?\\-]').test(previousWordLast)) {
              // If the current word has less than 50% upper case
              if (getCapitalPercentage(wordValue) <= 0.5) removeCapital = true;
            }
          }
        }
      }

      // If remove capital is true remove the first capital letter
      uwuifiedSentence += removeCapital
        ? ` ${wordValue.charAt(0).toLowerCase()}${wordValue.slice(1)}`
        : ` ${wordValue}`;
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
      if (pattern.test(wordValue)) {
        if (random <= this.exclimationsModifier) {
          wordValue = wordValue.replace(pattern, ``);
          wordValue += getElement(this.exclimations);
        }
      }

      // Reconstruct the string
      uwuifiedSentence += ` ${wordValue}`;
    });

    return uwuifiedSentence;
  }

  public uwuifySentence(sentence: string): string {
    let uwuifiedString = sentence;

    uwuifiedString = this.uwuifyExclimations(uwuifiedString);
    uwuifiedString = this.uwuifySpaces(uwuifiedString);
    uwuifiedString = this.uwuifyWords(uwuifiedString);

    return uwuifiedString;
  }
}
