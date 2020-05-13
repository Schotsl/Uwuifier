'use strict';

export const getElement = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getCapitalPercentage = (input: string): number => {
  let totalLetters = 0;
  let upperLetters = 0;

  for (const currentLetter of input) {
    if (new RegExp(/^[a-zA-Z]+$/).test(currentLetter)) {
      totalLetters++;

      if (currentLetter === currentLetter.toUpperCase()) {
        upperLetters++;
      }
    }
  }

  return upperLetters / totalLetters;
};

export const InitModifierParam = () => {
  return (target: { [key: string]: any }, key: string) => {
    let value = target[key];

    const getter = () => value;

    const setter = (next: number | object) => {
      if (typeof next === 'object') {
        next = Object.values(next).reduce((a, b) => a + b);
      }

      if (next < 0 || next > 1) {
        throw new Error(`${key} modifier value must be a number between 0 and 1`);
      }

      value = next;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
};
