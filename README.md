<a href="https://uwuifier.com">
    <img src="./logo-large.png" alt="Uwuifier logo" title="Uwuifier" align="right" height="60" />
</a>

<div style="display: flex; gap: 1rem; align-items: center; margin: 0 0 1rem;">
    <a href="https://badge.fury.io/js/uwuifier">
        <img src="https://badge.fury.io/js/uwuifier.svg" alt="npm version badge" />
    </a>
    <a href="https://jsr.io/@schotsl/uwuifier">
        <img src="https://jsr.io/badges/@schotsl/uwuifier" alt="JSR badge" />
    </a>
</div>

# Uwuifier

This lightweight package allows you to uwuify any sentence or word (excluding
URL's) with many configurable parameters while giving access to many vewy kawaii
sentences and faces! You can view a demo on https://uwuifier.com.

This package uses a seeded random generator to ensure all results will be the
same, this package also analyses the casing of every sentence to ensure letter
casing will still look correct even when the string is uwuified. If you've got
any more suggestions on how to improve this package, please create an issue on
our GitHub page!

This repository contains the Uwuifier package! It's written in Deno with
TypeScript and compiled into JavaScript for NPM, makes use of Jest for testing
the code and is deployed on NPM and https://deno.land.

# Table of content

- [Example](#example)
- [Quick start](#quick-start)
- [Constructor](#constructor)
- [Functions](#functions)
- [License](#license)

# Example

### Normal very boring text:

> This lightweight package allows you to uwuify any sentence or word (excluding
> URL's) with many configurable parameters while giving access to many vewy
> kawaii sentences and faces! This test sentence demonstrates the capabilities
> of the uwuifier package.

### Very kawaii text:

> This wightweight package a-a-awwows you to uwuify OwO any OwO sentence ow
> \*whispers to self\* wowd (excwuding UWW's) with many configuwabwe pawametews
> whiwe giving access to many vewy kawaii sentences and faces?!?1 This test
> sentence demonstwates the \*boops your nose\* capabiwities of the \*boops your
> nose\* uwuifiew package. \*sweats\*

# Quick start

## NPM (Node.js)

If you are using NPM (Node.js), follow these steps to install and use the
Uwuifier package:

### Install package using NPM:

```bash
npm install uwuifier
```

### Import and use the Uwuifier package in your Node.js project:

```typescript
import Uwuifier from "uwuifier";

const uwuifier = new Uwuifier();

console.log(uwuifier.uwuifySentence("This package is amazing!"));
```

## Deno

Since Deno uses URL based imports we don't need to install anything to get
started!

```typescript
// Import the Uwuifier package
import Uwuifier from "https://deno.land/x/uwuifier@v4.2.2/index.ts";

// Create a "Uwuifier" instance
const uwuifier = new Uwuifier();

// Uwuify a sentence
console.log(uwuifier.uwuifySentence("This package is amazing!"));
```

# Constructor

If you don't provide the Uwuifier constructor with an object it will use the
default values. Below we've included an example of what a valid constructor
object with the default values would look like while elaborating on it. We
recommend taking a look at the [functions](#functions) section of our
documentation, since there is a function for every object property that is
passed into the constructor:

```javascript
const uwuifier = new Uwuifier({
  spaces: {
    faces: 0.5,
    actions: 0.075,
    stutters: 0.1,
  },
  words: 1,
  exclamations: 1,
});
```

#### spaces

The `spaces` property is the most advanced property, at every space we can
either: add an action to the string \*notices buldge\*, add a s-s-stutter to the
start of the word, or we can add a face UwU. This means that the combined value
of all the three children properties must be equal or below 1. It should be
noted that the default actions, faces, and exclamations can be modified by
accessing and changing the public properties `actions`, `faces`, and
`exclamations`.

#### words

The `words` property affects what percentage of Regex matches get uwuified, the
default value is 1 which means that every character that matches the Regex gets
replaced. To gain a deeper understanding of what this Regex does please take a
look at the `uwuifyWords` function in the documentation.

#### exclamations

The `exclamations` property determines what percentage of exclamations get
replaced with a more 'expressive' exclamation from our internal array. It should
be noted that the default actions, faces, and exclamations can be modified by
accessing and changing the public properties `actions`, `faces`, and
`exclamations`.

# Functions

**Warning**: All functions besides the default `uwuifySentence` function
function might mangle a URL if it includes exclamations, spaces, or certain
characters. It should also be noted that every function in this package could
mangle other data such as phone-numbers, names, addresses, or any other
credentials.

## **`uwuifySentence(string)`**

The `uwuifySentence` function combines all three other functions (`uwuifyWords`,
`uwuifySpaces` and `uwuifyExclamations`) into one, it also filters out any
URL's. This is also why it's the easiest function to quickly get you started on
your weeaboo journey.

**Normal**:

> The random sentence generator generated a random sentence about a random
> sentence.

**Uwuified**:

> _sees buldge_ the wandom sentence genyewatow g-genyewated a wandom sentence
> about a wandom sentence?!!

### `uwuifyWords(string)`

The `uwuifyWords` function only runs a Regex on certain characters, by lowering
the `wordsModifier` value from the default 1 only a certain percentage of
characters will be modified, a value of 0.9 causes only 90% of matching
characters to be modified.

**Normal**:

> The random sentence generator generated a random sentence about a random
> sentence.

**Uwuified (`uwuifyWord`)**:

> The wandom sentence genyewatow genyewated a wandom sentence about a wandom
> sentence!

### `uwuifySpaces(string)`

The `uwuifyWords` function does most of the work! It adds random s-s-stutters to
certain words, adds _notices buldge_ actions in between words, and adds random
faces in between words UwU. It should be noted that the default actions, faces,
and exclamations can be modified by accessing and changing the public properties
`actions`, `faces`, and `exclamations`.

**Normal**:

> The random sentence generator generated a random sentence about a random
> sentence.

**Uwuified (`uwuifySpaces`)**:

> _sees buldge_ the :3 random sentence generator g-generated a :3 random
> sentence about a :3 random sentence!

### `uwuifyExclamations(string)`

The `uwuifyExclamations` function only replaces exclamations with more
'expressive' exclamations. It should be noted that the default actions, faces,
and exclamations can be modified by accessing and changing the public properties
`actions`, `faces`, and `exclamations`.

**Normal**:

> The random sentence generator generated a random sentence about a random
> sentence.

**Uwuified (`uwuifyExclamations`)**:

> The random sentence generator generated a random sentence about a random
> sentence?!!

# Acknowledgement

I was inspired to write this god awful package by
[this](https://honk.moe/tools/owo.html) site, I would've given full credit but
it appears he got most of the Regex from the OwO Google Chrome extension made by
leafysweetsgarden, I would include a link but the page is offline. So short
story short: I'd like to give a big thanks to leafysweetsgarden for the Regex
and the inspiration!

# License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
