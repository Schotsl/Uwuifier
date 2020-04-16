# Uwuifier

> This very lightweight package allows you to uwuify any sentence or word (excluding URL's) with many configurable parameters while giving you access to many vewy kawaii sentences and faces (**this package is made in and supports TypeScript!**)

[![NPM Version][npm-image]][npm-url]

## Install

### Deno
```js
import { uwuifySentence, uwuifyWord, uwuFace } from 'https://deno.land/x/uwuifier/src/index.ts';
```

### Node
```bash
npm install uwuifier --save
```

## Example

### Normal very boring text:
>This is a test sentence to demonstrate the current functionality, as the package grows and becomes more advanced this sample will have to be updated!

### Very kawaii text:
>This is a test sentence to demonstwate the cuwwent *boops your nose* functionyawity, as the package gwows and becomes mowe advanced this sampwe wiww *sees buldge* have to be updated?!?!

## Usage

### Uwuify a sentence
`uwuifySentece()` takes in a string and returns an uwuified string. It doesn't uwuify URL's (unlike `uwuifyWord()`)

```javascript
// Only required for Node
import { uwuifySentence } from 'uwuifier';

const normalSentence = "This is a normal sentence";
const uwuifiedSentence = uwuifySentence(normalSentence);

console.log(uwuifiedSentence);
```

### Uwuify a word
`uwuifyWord()` also takes in a string and returns an uwuified string, it uwuify's ever character and doesn't care about URL's)

```javascript
// Only required for Node
import { uwuifyWord } from 'uwuifier';

const normalWord = "Train";
const uwuifiedWord = uwuifyWord(normalWord);

console.log(uwuifiedWord);
```

### Get an uwu face
`uwuFace()` just returns a very kawaii face such as ÚwÚ

```javascript
// Only required for Node
import { uwuFace } from 'uwuifier';

const uwuFace = uwuFace();

console.log(uwuFace);
```


## License

[ISC](http://vjpr.isc-license.org)

[npm-image]: https://img.shields.io/npm/v/uwuifier.svg
[npm-url]: https://www.npmjs.com/package/uwuifier