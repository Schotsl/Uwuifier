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

  public uwuifyWord(word: string): string {
    word = word.replace(/(?:r|l)/g, `w`);
    word = word.replace(/(?:R|L)/g, `W`);
    word = word.replace(/n([aeiou])/g, `ny$1`);
    word = word.replace(/N([aeiou])/g, `Ny$1`);
    word = word.replace(/N([AEIOU])/g, `Ny$1`);
    word = word.replace(/ove/g, `uv`);
    return word;
  }

  public uwuifySentence(sentence: string): string {
    // Replace normal question marks and exclamations with more 'expressive' characters
    if (this.exclimations.length) sentence = sentence.replace(new RegExp('[?!]+$'), getElement(this.exclimations));

    // Spwit the sentence into wowds
    const words = sentence.split(` `);
    const pattern = new RegExp(/(?:https?|ftp):\/\/[\n\S]+/g);

    // If the word is a URL just attach it to the new string without uwuifying
    let uwuified = ``;

    words.forEach((normalWord, wordIndex) => {
      const isUrl = pattern.test(normalWord);
      const isUwuified = normalWord !== this.uwuifyWord(normalWord);

      let uwuifiedWord = isUrl ? normalWord : this.uwuifyWord(normalWord);

      let insertedExpression = false;
      let removeCapital = false;

      const random = Math.random();

      // 5% chance of getting a random face
      if (random <= 0.05 && this.faces.length) {
        uwuified += ` ${getElement(this.faces)}`;
        insertedExpression = true;
        // 5% chance of a getting a random action
      } else if (random <= 0.1 && this.actions.length) {
        uwuified += ` ${getElement(this.actions)}`;
        insertedExpression = true;
        // 10% chance of stutter if the word hasn't been uwuified before for readability
      } else if (random <= 0.2 && !isUwuified && !isUrl) {
        const letter = normalWord[0];
        const stutter = getRandomInt(0, 2);

        for (let i = 0; i < stutter; i++) {
          uwuifiedWord = `${letter}-${uwuifiedWord}`;
        }
      }

      // If we added a face or action
      if (insertedExpression) {
        // Only check if we should remove the first capital letter if it's actually a capital letter
        if (normalWord[0] === normalWord[0].toUpperCase()) {
          if (wordIndex === 0) {
            // If it's the first word and has less than 50% upper case
            if (getCapitalPercentage(normalWord) <= 0.5) removeCapital = true;
          }

          if (wordIndex !== 0) {
            // If the previous word ends with punctuation continue with the logic
            const previousWord = words[wordIndex - 1];
            const previousWordLast = previousWord[previousWord.length - 1];

            if (new RegExp('[.!?\\-]').test(previousWordLast)) {
              // If the current word has less than 50% upper case
              if (getCapitalPercentage(normalWord) <= 0.5) removeCapital = true;
            }
          }
        }
      }

      // If remove capital is true remove the first capital letter
      uwuified += removeCapital
        ? ` ${uwuifiedWord.charAt(0).toLowerCase()}${uwuifiedWord.slice(1)}`
        : ` ${uwuifiedWord}`;
    });

    return uwuified;
  }

  // Get a random uwu face
  public uwuFace(): string {
    return this.faces[Math.floor(Math.random() * this.faces.length)];
  }
}
