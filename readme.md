<a href="https://aimeos.org/">
    <img src="https://uwuifier.com/logo-large.png" alt="Uwuifier logo" title="Uwuifier" align="right" height="60" />
</a>

Uwuifier
======================
[![NPM Version][npm-image]][npm-url]

This very lightweight package allows you to uwuify any sentence or word (excluding URL's) with many configurable parameters while giving access to many vewy kawaii sentences and faces! You can view a demo on https://uwuifier.com

This package uses a seeded random generator to ensure al results will be the same, the package also analyses sentence casing to ensure letter casing will still look correct even when the string is uwuified. If you've got any more suggestions on how to improve this package please create an issue on our GitHub page!

&nbsp;

# Table of content

- [Example](#example)
- [Quick start](#quick-start)
    - [Deno](#deno)
    - [JavaScript](#javascript)
- [Constructor](#constructor)
- [Functions](#functions)
- [License](#license)

&nbsp;

# Example

### Normal very boring text:
> This very lightweight package allows you to uwuify any sentence or word (excluding URL's) with many configurable parameters while giving access to many vewy kawaii sentences and faces! This test sentence demonstrates the capabilities of the uwuifier package.

### Very kawaii text:
> This vewy wightweight package a-awwows you t-to owo uwuify ;;w;; any sentence (・\`ω´・) ow wowd (excwuding UWW's) with many configuwabwe pawametews whiwe giving access t-to many vewy kawaii sentences and faces!!11 This test sentence demonstwates x3 the capabiwities of x3 the uwuifiew \*sweats\* package.

&nbsp;

# Quick start

## Deno

With Deno we don't need to install the Uwuifier package so you can just download it from a URL!

```ts
// Import the Uwuifier package
import { Uwuifier } from 'https://deno.land/x/uwuifier/src/index.ts';

// Create a "Uwuifier" instance
const uwuifier = new Uwuifier();

// Uwuifiy a sentence
console.log(uwuifier.uwuifySentence('This package is amazing!');
```

## JavaScript

To use Uwuifier in Node, JavaScript or TypeScript you firstly have to install it using NPM.

```bash
npm install uwuifier --save
```

Then we can import Uwuifier in our project.

```js
// Import the Uwuifier package
import { Uwuifier } from 'Uwuifier';

// Create a "Uwuifier" instance
const uwuifier = new Uwuifier();

// Uwuifiy a sentence
console.log(uwuifier.uwuifySentence('This package is amazing!');
```

&nbsp;

# Constructor

If you don't provide the Uwuifier constructor with an object it will use the default values. Below we've included an example of what a valid constructor object could look like while elaborating on it. We would recommend taking a look at the [functions](#functions) section of our documentation since there is a function for every object property that is passed into the constructor:

```javascript
const uwuifier = new Uwuifier({
    spacesModifierParam: {
        facePercentage: 0.3,
        actionPercentage: 0.05,
        stutterPercentage: 0.1
    },
    wordsModifierParam: 1,
    exclamationsModifierParam: 0
 });
 ```
 
 #### spacesModifierParam
 The `spacesModifierParam` is the most advanced property, at every space we can either: add an action to the string \*notices buldge\*, add a s-s-stutter to the start of the word, or we can add a face UwU. This means that the combined value of all the three children properties must be equal or below 1. It should be noted that the default actions, faces, and exclamations can be modified by accessing and changing the public properties `actions`, `faces`, and `exclamations`.
 
 #### wordsModifierParam
 The `wordsModifierParam` property affects what percentage of Regex matches get uwuified, the default value is 1 which means that every letter that matches the Regex gets replaced. To gain a deeper understanding of what this Regex does please take a look at the `uwuifyWords` function in the documentation.
 
#### exclamationsModifierParam
The `exclamationsModifierParam` determines what percentage of exclamations get replaced with a more 'expressive' exclamation from our internal array. It should be noted that the default actions, faces, and exclamations can be modified by accessing and changing the public properties `actions`, `faces`, and `exclamations`.
 
&nbsp;

# Functions

**Warning**: All functions besides the default `uwuifySentence` function function might mangle a URL if it includes exclamations, spaces, or certain letters. It should also be noted that every function in this package could mangle other data such as phone-numbers, names, addresses, or any other credentials.

## **`uwuifySentence(string)`**

The `uwuifySentence` function combines all three other functions (`uwuifyWords`, `uwuifySpaces` and `uwuifyExclamations`) into one, it also filters out any URL's. This is also why it's the easiest function to quickly get you started on your weeaboo journey.

**Normal**:
> The random sentence generator generated a random sentence about a random sentence.

**Uwuified**:
> *sees buldge* the wandom sentence genyewatow g-genyewated a wandom sentence about a wandom sentence?!!

&nbsp;

### `uwuifyWords(string)`

The `uwuifyWords` function only runs a Regex on certain characters, by lowering the `wordsModifier` value from the default 1 only a certain percentage of letters will be modified, a value of 0.9 causes only 90% of matching letters to be modified.

**Normal**:
> The random sentence generator generated a random sentence about a random sentence.

**Uwuified (`uwuifyWord`)**:
> The wandom sentence genyewatow genyewated a wandom sentence about a wandom sentence!

&nbsp;

### `uwuifySpaces(string)`

The `uwuifyWords` function does most of the work! It adds random s-s-stutters to certain words, adds *notices buldge* actions in between words, and adds random faces in between words UwU. It should be noted that the default actions, faces, and exclamations can be modified by accessing and changing the public properties `actions`, `faces`, and `exclamations`.

**Normal**:
> The random sentence generator generated a random sentence about a random sentence.

**Uwuified (`uwuifySpaces`)**:
> *sees buldge* the :3 random sentence generator g-generated a :3 random sentence about a :3 random sentence!

&nbsp;

### `uwuifyExclamations(string)`

The `uwuifyExclamations` function only replaces exclamations with more 'expressive' exclamations. It should be noted that the default actions, faces, and exclamations can be modified by accessing and changing the public properties `actions`, `faces`, and `exclamations`.

**Normal**:
> The random sentence generator generated a random sentence about a random sentence.

**Uwuified (`uwuifyExclamations`)**:
> The random sentence generator generated a random sentence about a random sentence?!!

&nbsp;

# ISC License

Copyright (c) 2020, Sjors van Holst

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/uwuifier.svg
[npm-url]: https://www.npmjs.com/package/uwuifier
