# Uwuifier

This very lightweight package allows you to uwuify any sentence or word (excluding URL's) with many configurable parameters while giving access to many vewy kawaii sentences and faces (**this package is made in and supports TypeScript!**)

This package uses a seeded random generator to ensure al results will be the same, the package also analyses sentence casing to ensure letter casing will still look correct even when the string is uwuified. If you've got any more suggestions on how to improve this package please create an issue!

[![NPM Version][npm-image]][npm-url]

&nbsp;

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

# Parameters

### The Uwuifier constructor takes these three arguments in the listed order

**All of these constructor parameters must be between or equal to 0 and 1, even the array must have a combined value between or equal to 0 and 1. Every parameter except the spaces' modifier already has a default value of 1 to maximize the UwU factor!**

| Name                  | Type   | Description                                                    |
| :-------------------- | :----- | :------------------------------------------------------------- |
| Spaces modifier       | array  |  I've elaborated on this array description below               |
| Words modifier        | float  |  This float determines what percentage of letters get uwuified |
| Exclamations modifier | float  |  This float determines how often exclimations will be placed   |


### Spaces modifier

The spaces modifier is a complicated parameter, it's an array which must have a fixed length of 3 that has a combined value between or equal to 0 and 1. This is what the array should look like `[facePercentage, actionPercentage, stutterPercentage]`. At every whitespace we will generate a random seeded value which determines what we will insert, a UwU face, an 'action' such as \*notices buldge\* or some s-s-stutter

So let's say you passed an array with these values: `[0, 0, 1]` would result in a string like the one quoted below, this is because we've increased the stutter percentage to 100% and moved every other probability to 0%
> "F-from n-n-ow o-on e-e-every w-word s-s-stutters"

### Default values

*So this is what the default constructer would look like if you we're to write it out whole*

```js
const uwuifier = new Uwuifier(1, 1, [0.05, 0.05, 0.1])
```

&nbsp;

# Functions

The Uwuifiers package contains 3 public functions: `uwuifyWords`, `uwuifySpaces`, `uwuifyExclimations` & `uwuifySentence`

### **`uwuifySentence(string)`**

This function combines all other functions and is probably the one you want too use

### `uwuifyWords(string)`

### `uwuifySpaces(string)`

### `uwuifyExclimations(string)`


&nbsp;

# License

[ISC](http://vjpr.isc-license.org)

[npm-image]: https://img.shields.io/npm/v/uwuifier.svg
[npm-url]: https://www.npmjs.com/package/uwuifier