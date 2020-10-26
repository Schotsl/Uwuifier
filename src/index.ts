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
    `*sees bulge*`,
    `*runs away*`,
    `*huggles tightly*`,
    `*boops your nose*`,
    `*starts twerking*`
  ];
  public uwuMap = [
    [/(?:r|l)/g, `w`],
    [/(?:R|L)/g, `W`],
    [/n([aeiou])/g, `ny$1`],
    [/N([aeiou])/g, `Ny$1`],
    [/N([AEIOU])/g, `Ny$1`],
    [/ove/g, `uv`]
  ];

  @InitModifierParam()
  private _spacesModifier: SpacesModifier;
  @InitModifierParam()
  private _wordsModifier: number;
  @InitModifierParam()
  private _exclamationsModifier: number;

  constructor(
    { spaces = { faces: 0.05, actions: 0.075, stutters: 0.1 }, words = 1, exclamations = 1 } = {
      spaces: { faces: 0.05, actions: 0.075, stutters: 0.1 },
      words: 1,
      exclamations: 1
    }
  ) {
    this._spacesModifier =
      typeof spaces !== `undefined`
        ? spaces
        : {
            faces: 0.05,
            actions: 0.075,
            stutters: 0.1
          };
    this._wordsModifier = typeof words !== `undefined` ? words : 1;
    this._exclamationsModifier = typeof exclamations !== `undefined` ? exclamations : 1;
  }

  public uwuifyWords(sentence: string): string {
    const words = sentence.split(` `);

    const uwuifiedSentence = words
      .map((word) => {
        if (isUri(word)) return word;

        const seed = new Seed(word);

        for (const [oldWord, newWord] of this.uwuMap) {
          // Generate a random value for every map so words will be partly uwuified instead of not at all
          if (seed.random() > this._wordsModifier) continue;

          word = word.replace(oldWord, newWord as string);
        }

        return word;
      })
      .join(' ');

    return uwuifiedSentence;
  }

  public uwuifySpaces(sentence: string): string {
    const words = sentence.split(` `);

    const faceThreshold = this._spacesModifier.faces;
    const actionThreshold = this._spacesModifier.actions + faceThreshold;
    const stutterThreshold = this._spacesModifier.stutters + actionThreshold;

    const uwuifiedSentence = words
      .map((word, index) => {
        const seed = new Seed(word);
        const random = seed.random();

        const firstCharacter = word[0];

        if (random <= faceThreshold && this.faces) {
          // Add random face before the word
          word += ' ' + this.faces[seed.randomInt(0, this.faces.length - 1)];
          checkCapital();
        } else if (random <= actionThreshold && this.actions) {
          // Add random action before the word
          word += ' ' + this.actions[seed.randomInt(0, this.actions.length - 1)];
          checkCapital();
        } else if (random <= stutterThreshold && !isUri(word)) {
          // Add stutter with a length between 0 and 2
          const stutter = seed.randomInt(0, 2);

          return (firstCharacter + '-').repeat(stutter) + word;
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
            const prevWordEndsWithPunctuation = new RegExp('[.!?\\-]').test(previousWordLastChar);

            if (!prevWordEndsWithPunctuation) return;
            word = firstCharacter.toLowerCase() + word.slice(1);
          }
        }

        return word;
      })
      .join(' ');

    return uwuifiedSentence;
  }

  public uwuifyExclamations(sentence: string): string {
    const words = sentence.split(` `);
    const pattern = new RegExp('[?!]+$');

    const uwuifiedSentence = words
      .map((word) => {
        const seed = new Seed(word);

        // If there are no exclamations return
        if (!pattern.test(word) || seed.random() > this._exclamationsModifier) return word;

        word = word.replace(pattern, ``);
        word += this.exclamations[seed.randomInt(0, this.exclamations.length - 1)];

        return word;
      })
      .join(' ');

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
