# Uwufier

> This vewy light weight packwage will uwufy any sentwence or word and expowts a few vewy handy functions!! if youw into uwufying and mawking youw code more kawaii ÚwÚ (**this package is made in and supports TypeScript!**)

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm install uwufier --save
```

## Example

### Normal very boring text:
>This is a test sentence to demonstrate the current functionality, as the package grows and becomes more advanced this sample will have to be updated!

### Very kawaii text:
>This is a test sentence to demonstwate the cuwwent functionyawity, as the package gwows and becomes mowe advanced this sampwe wiww have to be updated?!!11

## Usage

### Uwuify a sentence
`uwuifySentece()` takes in a string and returns an uwufied string. It doesn't uwuify URL's (unlike `uwuifyWord()`)

```javascript
import { uwufySentence } from 'uwufier';

const normalSentence = "This is a normal sentence";
const uwufiedSentence = uwufySentence(normalSentence);

console.log(uwufiedSentence);
```

### Uwuify a word
`uwuifyWord()` also takes in a string and returns an uwufied string, it uwuify's ever character and doesn't care about URL's)

```javascript
import { uwufyWord } from 'uwufier';

const normalWord = "Train";
const uwufiedWord = uwuifyWord(normalWord);

console.log(uwufiedWord);
```

### Get an uwu face
`uwuFace()` just returns a very kawaii face such as ÚwÚ

```javascript
import { uwuFace } from 'uwufier';

const uwufiedFace = uwuFace();

console.log(uwufiedFace);
```


## License

[ISC](http://vjpr.isc-license.org)

[npm-image]: https://img.shields.io/npm/v/uwufier.svg
[npm-url]: https://www.npmjs.com/package/uwufier