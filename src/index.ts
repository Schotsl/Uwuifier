'use strict';

const faces = [`(・\`ω´・)`, `;;w;;`, `owo`, `UwU`, `>w<`, `^w^`, `ÚwÚ`, `:3`, `x3`];
const actions = [
  `*blushes*`,
  `*whispers to self*`,
  `*sweats*`,
  `*sees buldge*`,
  `*runs away*`,
  `*huggles tightly*`,
  `*boops your nose*`,
  `*starts twerking*`
];
const exclimations = [`?!!`, `?!?1`, `!!11`, `?!?!`, `!?`];

function getElement(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uwufyWord(word: string): string {
  word = word.replace(/(?:r|l)/g, `w`);
  word = word.replace(/(?:R|L)/g, `W`);
  word = word.replace(/n([aeiou])/g, `ny$1`);
  word = word.replace(/N([aeiou])/g, `Ny$1`);
  word = word.replace(/N([AEIOU])/g, `Ny$1`);
  word = word.replace(/ove/g, `uv`);

  return word;
}

export function uwufySentence(sentence: string): string {
  // Wepwace nyowmaw question mawks and excwamations with mowe 'expwessive' chawactews
  sentence = sentence.replace(new RegExp('[?!]+$'), getElement(exclimations));

  // Spwit the sentence into wowds
  const words = sentence.split(` `);
  const pattern = new RegExp(/(?:https?|ftp):\/\/[\n\S]+/g);

  // If the wowd is a UWW just attach it to the nyew stwing without uwufying
  let uwufied = ``;

  words.forEach((normalWord) => {
    const isUrl = pattern.test(normalWord);
    const isUwuified = normalWord !== uwufyWord(normalWord);

    let uwufiedWord = isUrl ? normalWord : uwufyWord(normalWord);

    const random = Math.random();

    // 5% chance of getting a random face
    if (random <= 0.05) {
      uwufied += ` ${getElement(faces)}`;
      // 5% chance of a getting a random action
    } else if (random <= 0.1) {
      uwufied += ` ${getElement(actions)}`;
      // 10% chance of stutter if the word hasn't been uwufied before for readability
    } else if (random <= 0.2 && !isUwuified && !isUrl) {
      const letter = normalWord[0];
      const stutter = getRandomInt(0, 2);

      for (let i = 0; i < stutter; i++) {
        uwufiedWord = `${letter}-${uwufiedWord}`;
      }
    }

    uwufied += ` ${uwufiedWord}`;
  });

  return uwufied;
}

// Get a wandom uwu face
export function uwuFace(): string {
  return faces[Math.floor(Math.random() * faces.length)];
}
