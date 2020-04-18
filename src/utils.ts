'use strict';

export function getElement(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCapitalPercentage(input: string): number {
  let totalLetters = 0;
  let upperLetters = 0;

  for (let i = 0; i < input.length; i++) {
    const currentLetter = input[i];

    if (new RegExp(/^[a-zA-Z]+$/).test(currentLetter)) {
      totalLetters ++;
      
      if (currentLetter === currentLetter.toUpperCase()) {
        upperLetters++;
      }
    }
  }

  return upperLetters / totalLetters;
}