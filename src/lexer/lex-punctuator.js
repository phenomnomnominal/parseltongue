// Constants:
const PUNCTUATOR_REGEX = /[!\.\+\-\*\/\^%<>,\[\]{}\(\)&\|=~]/;

const LENGTH_ONE = [
    '!', '.', '+','-', '*', '/', '^', '%', '<', '>', ',', '(', ')', '[', ']', '{', '}'
];
const LENGTH_TWO = [
    '&&', '||', '<~', '~>', '<=', '>=', '==', '!='
];
const WORDS = [null, LENGTH_ONE, LENGTH_TWO];

// Utilities:
import { backup, next } from './lex-utils';

// Dependencies:
import { lexText } from './lex-text';
import { PUNCTUATOR } from '../tokens/token-types';
import { addToken } from '../tokens/tokens';

export function isPunctuatorChar (c) {
    return PUNCTUATOR_REGEX.test(c);
}

export function lexPunctuator (state) {
      let c = next(state);
      // Since "=" and "~"" are only valid when they appear next to
      // another punctuator, we check the punctators of length 2
      // first.
      let nextTwo = `${c}${next(state)}`;
      if (isPunctuator(nextTwo)) {
          addToken(state, PUNCTUATOR);
          return lexText;
      }

      backup(state);
      if (isPunctuator(c)) {
          addToken(state, PUNCTUATOR);
          return lexText;
      }

      throw new SyntaxError(`Invalid punctuator: "${c}"`);
}

function isPunctuator (word) {
    return WORDS[word.length].includes(word);
}
