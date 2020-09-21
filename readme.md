<a href="https://aimeos.org/">
    <img src="https://uwuifier.com/logo-large.png" alt="Uwuifier logo" title="Uwuifier" align="right" height="60" />
</a>

Uwuifier
======================
[![NPM Version][npm-image]][npm-url]

This very lightweight package allows you to uwuify any sentence or word (excluding URL's) with many configurable parameters while giving access to many vewy kawaii sentences and faces! You can view a demo on https://uwuifier.com

This package uses a seeded random generator to ensure al results will be the same, the package also analyses sentence casing to ensure letter casing will still look correct even when the string is uwuified. If you've got any more suggestions on how to improve this package please create an issue!

&nbsp;

# Table of content

- [Example](#example)
- [Quick start](#quick-start)
    - [Deno](#deno)
    - [Node](#node)
- [Functions](#functions)
- [License](#license)


# Example

### Normal very boring text:
>This is a test sentence to demonstrate the current functionality, as the package grows and becomes more advanced this sample will have to be updated!

### Very kawaii text:
>This is a test \*boops your nose\* sentence ÚwÚ to demonstwate x3 the c-cuwwent \*huggles tightly\* functionyawity, as x3 the package gwows a-and becomes mowe advanced this s-sampwe wiww ;;w;; have ÚwÚ to be updated?!?!

&nbsp;

# Quick start

## Deno

With Deno we don't need to install the Uwuifier package so we can just directly download it from a URL!

```ts
// Import the Uwuifier package
import { Uwuifier } from 'https://deno.land/x/uwuifier/src/index.ts';

// Create a "Uwuifier" instance
const uwuifier = new Uwuifier();

// Uwuifiy a sentence
console.log(uwuifier.uwuifySentence('This package is amazing!");
```

## Node

To use Uwuifier in Node we firstly have to install it using NPM

```bash
npm install uwuifier --save
```

Than we can import Uwuifier in the JavaScript file

```js
// Import the Uwuifier package
import { Uwuifier } from 'Uwuifier';

// Create a "Uwuifier" instance
const uwuifier = new Uwuifier();

// Uwuifiy a sentence
console.log(uwuifier.uwuifySentence('This package is amazing!");
```

&nbsp;

### Default values

*So this is what the default constructer would look like if you we're to write it out whole*

```js
const uwuifier = new Uwuifier(1, 1, [0.05, 0.05, 0.1])
```

&nbsp;

# Functions

**Warning**: All functions besides the default 'uwuifySentence' function might mangle a URL if it includes exclamations, spaces, or certain letters. Please also note that any other data will be mangled, such as phone, names, addresses, or any credentials.

## **`uwuifySentence(string)`**

The 'uwuifySentence' function combines all three other functions ('uwuifyWords', 'uwuifySpaces' and 'uwuifyExclimations') into one, it also filters out any URL's. This is also why it's the easiest function to quickly get you started on your weeaboo journey.

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

### `uwuifyExclimations(string)`

The `uwuifyExclimations` function only replaces exclamations with more 'expressive' exclamations. It should be noted that the default actions, faces, and exclamations can be modified by accessing and changing the public properties `actions`, `faces`, and `exclamations`.

**Normal**:
> The random sentence generator generated a random sentence about a random sentence.

**Uwuified (`uwuifyExclimations`)**:
> The random sentence generator generated a random sentence about a random sentence?!!

&nbsp;

# License

[ISC](http://vjpr.isc-license.org)

[npm-image]: https://img.shields.io/npm/v/uwuifier.svg
[npm-url]: https://www.npmjs.com/package/uwuifier
