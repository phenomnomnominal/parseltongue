// Dependencies:
import { LENGTH_ONE, LENGTH_TWO } from './punctuators';

const WORDS = [null, LENGTH_ONE, LENGTH_TWO];

export function isPunctuator (word) {
    let words = WORDS[word.length];
    return !!words && words.includes(word);
}
