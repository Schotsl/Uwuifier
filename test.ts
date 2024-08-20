import Seed from "./seed.ts";
import Uwuifier from "./index.ts";

import { assertEquals } from "./utils.ts";

const uwuifier = new Uwuifier({
  spaces: { faces: 0.3, actions: 0.05, stutters: 0.1 },
  words: 1,
  exclamations: 0,
});

const originalSentences = [
  "I had to get a tetanus vaccine when i stabbed my foot by accident",
  "When you say tonight, at what time approximately do you mean",
  "I need someone to go through the coop thing with me",
  "I'm really struggling to put this story toghether, you we're chilling with a dude who has decided that woman sucks",
  "No there has been this lockdown in the Netherlands so check out this site: https://www.who.int/health-topics",
  "Wow you're old as fuck, you're basically my grandpa you know!",
];

const uwuifiedSentences = [
  "I-I-I had to ÚwÚ g-get a tetanyus vaccinye when ^-^ i stabbed my foot by (・`ω´・) accident ÚwÚ",
  "When you say UwU tonyight, at what time appwoximatewy do you mean",
  "I-I-I nyeed someonye ÚwÚ to ÚwÚ go thwough the x3 coop thing with me",
  "I'm weawwy x3 stwuggwing ÚwÚ to ÚwÚ put this stowy t-toghethew, you we'we chiwwing with a dude who h-h-has decided that woman sucks",
  "nyo ;;w;; thewe h-h-has b-been this wockdown in the x3 Nyethewwands so check out ^-^ this site: https://www.who.int/health-topics :3",
  "wow UwU you'we owd as fuck, UwU you'we basicawwy :3 my gwandpa you knyow! UwU",
];

const originalWords = [
  "Stabbed",
  "Tonight",
  "Through",
  "Struggling",
  "Netherlands",
  "Grandpa",
];

const uwuifiedWords = [
  "Stabbed",
  "Tonyight",
  "Thwough",
  "Stwuggwing",
  "Nyethewwands",
  "Gwandpa",
];

Deno.test(`Uwufy words & check for inconsistency`, () => {
  const transformedWords = originalWords.map((word) =>
    uwuifier.uwuifyWords(word)
  );

  assertEquals(transformedWords, uwuifiedWords);
});

Deno.test("Uwufy sentences & check for inconsistency", () => {
  const transformedSentences = originalSentences.map((sentence) =>
    uwuifier.uwuifySentence(sentence)
  );

  assertEquals(transformedSentences, uwuifiedSentences);
});

Deno.test("Check consistency of number generator", () => {
  const firstSample = new Seed("test").random();
  const secondSample = new Seed("test").random();

  assertEquals(firstSample, secondSample);
});
