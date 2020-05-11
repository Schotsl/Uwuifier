'use strict';

import { getElement, getRandomInt, getCapitalPercentage } from './utils';

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

  public uwuifyWords(sentence: string): string {
    let uwuifiedSentence = ``;

    // Split the string into words
    const words = sentence.split(` `);
    const pattern = new RegExp(/(?:https?|ftp):\/\/[\n\S]+/g);

    words.forEach((word) => {
      // If word is a URL don't uwuifiy it
      if (pattern.test(word)) {
        word = word.replace(/(?:r|l)/g, `w`);
        word = word.replace(/(?:R|L)/g, `W`);
        word = word.replace(/n([aeiou])/g, `ny$1`);
        word = word.replace(/N([aeiou])/g, `Ny$1`);
        word = word.replace(/N([AEIOU])/g, `Ny$1`);
        word = word.replace(/ove/g, `uv`);
      }

      // Reconstruct the string with uwuified words
      uwuifiedSentence += ` ${word}`;
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

      if (random <= 0.05 && this.faces.length) {
        // Add random face before the word
        uwuifiedSentence += ` ${getElement(this.faces)}`;
        insertedExpression = true;
      } else if (random <= 0.1 && this.actions.length) {
        // Add random action before the word
        uwuifiedSentence += ` ${getElement(this.actions)}`;
        insertedExpression = true;
      } else if (random <= 0.2) {
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
    if (this.exclimations.length) sentence = sentence.replace(new RegExp('[?!]+$'), getElement(this.exclimations));
    return sentence;
  }

  public uwuifySentence(sentence: string): string {
    let uwuifiedString = sentence;

    uwuifiedString = this.uwuifyExclimations(uwuifiedString);
    uwuifiedString = this.uwuifySpaces(uwuifiedString);
    uwuifiedString = this.uwuifyWords(uwuifiedString);

    return uwuifiedString;
  }

  // Get a random uwu face
  public uwuFace(): string {
    return this.faces[Math.floor(Math.random() * this.faces.length)];
  }
}
