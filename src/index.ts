'use strict';

export let faces: string[] = [`(・\`ω´・)`, `;;w;;`, `owo`, `UwU`, `>w<`, `^w^`, `ÚwÚ`, `:3`, `x3`];
export let actions: string[] = [
  `*blushes*`,
  `*whispers to self*`,
  `*sweats*`,
  `*sees buldge*`,
  `*runs away*`,
  `*huggles tightly*`,
  `*boops your nose*`,
  `*starts twerking*`
];
export let exclimations: string[] = [`?!!`, `?!?1`, `!!11`, `?!?!`, `!?`];

function getElement(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// All get functions
export function getExclimations(): string[] {
  return exclimations;
}
export function getActions(): string[] {
  return actions;
}
export function getFaces(): string[] {
  return faces;
}

// All set functions
export function setExclimations(newExclimations: string[]): void {
  exclimations = newExclimations;
}
export function setActions(newActions: string[]): void {
  actions = newActions;
}
export function setFaces(newFaces: string[]): void {
  faces = newFaces;
}

// All add functions
export function addExclimation(newExclimation: string): void {
  exclimations.push(newExclimation);
}
export function addAction(newAction: string): void {
  actions.push(newAction);
}
export function addFace(newFace: string): void {
  faces.push(newFace);
}

// All remove functions
export function removeExclimation(removedExclimation: string): void {
  exclimations = exclimations.filter((exclimation) => exclimation !== removedExclimation);
}
export function removeAction(removedAction: string): void {
  actions = actions.filter((action) => action !== removedAction);
}
export function removeFace(removedFace: string): void {
  faces = faces.filter((face) => face !== removedFace);
}

export function uwuifyWord(word: string): string {
  word = word.replace(/(?:r|l)/g, `w`);
  word = word.replace(/(?:R|L)/g, `W`);
  word = word.replace(/n([aeiou])/g, `ny$1`);
  word = word.replace(/N([aeiou])/g, `Ny$1`);
  word = word.replace(/N([AEIOU])/g, `Ny$1`);
  word = word.replace(/ove/g, `uv`);
  return word;
}

export function uwuifySentence(sentence: string): string {
  // Replace normal question marks and exclamations with more 'expressive' characters
  if (exclimations.length) sentence = sentence.replace(new RegExp('[?!]+$'), getElement(exclimations));

  // Spwit the sentence into wowds
  const words = sentence.split(` `);
  const pattern = new RegExp(/(?:https?|ftp):\/\/[\n\S]+/g);

  // If the word is a URL just attach it to the new string without uwuifying
  let uwuified = ``;

  words.forEach((normalWord) => {
    const isUrl = pattern.test(normalWord);
    const isUwuified = normalWord !== uwuifyWord(normalWord);

    let uwuifiedWord = isUrl ? normalWord : uwuifyWord(normalWord);

    const random = Math.random();

    // 5% chance of getting a random face
    if (random <= 0.05 && faces.length) {
      uwuified += ` ${getElement(faces)}`;
      // 5% chance of a getting a random action
    } else if (random <= 0.1 && actions.length) {
      uwuified += ` ${getElement(actions)}`;
      // 10% chance of stutter if the word hasn't been uwuified before for readability
    } else if (random <= 0.2 && !isUwuified && !isUrl) {
      const letter = normalWord[0];
      const stutter = getRandomInt(0, 2);

      for (let i = 0; i < stutter; i++) {
        uwuifiedWord = `${letter}-${uwuifiedWord}`;
      }
    }

    uwuified += ` ${uwuifiedWord}`;
  });

  return uwuified;
}

// Get a random uwu face
export function uwuFace(): string {
  return faces[Math.floor(Math.random() * faces.length)];
}
