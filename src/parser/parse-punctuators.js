// Constants:
import { PUNCTUATOR } from '../tokens/token-types';

// Utilities:
import { consume, next, throwUnexpected } from './parser-utils';

export function expectPunctuators (state, punctuators) {
    let token = consume(state);
    let { type, value } = token;
    if (type !== PUNCTUATOR) {
        throwUnexpected(state, PUNCTUATOR, token);
    }

    if (Array.isArray(punctuators)) {
        if (!punctuators.includes(value)) {
            throwUnexpected(state, `one of [${punctuators}]`, token);
        }
    } else if (value !== punctuators) {
        throwUnexpected(state, punctuators, token);
    }

    return token;
}

export function matchPunctuators (state, punctuators) {
      let { type, value } = next(state);
      if (type !== PUNCTUATOR) {
          return false;
      }

      if (Array.isArray(punctuators)) {
          return punctuators.includes(value);
      }
      else {
          return value === punctuators;
      }
}
