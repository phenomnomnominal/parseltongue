// Constants:
const DECIMAL_CHAR = '.';
const DECIMAL_DIGIT_TEXT = /[0-9]/;

// Utilities:
import { accept, acceptRun, peek } from './lexer-utils';

// Dependencies:
import { isIdentifierChar } from './lex-identifier';
import { isQuoteChar } from './lex-quote';
import { lexText } from './lex-text';
import { NUMERIC_LITERAL } from '../tokens/token-types';
import { addToken } from '../tokens/tokens';

export function isDecimalDigit (c) {
    return DECIMAL_DIGIT_TEXT.test(c);
}

export function lexNumber (state) {
    let validator = isDecimalDigit;

    // Keep on consuming valid digits until it runs out
    acceptRun(state, validator);

    if (validator == isDecimalDigit) {
        // A number could have a decimal in it, followed by a sequence of valid
        // digits again.
        if (accept(state, isDecimalChar)) {
            acceptRun(state, validator);
        }
    }

    // A number cannot be immediately followed by characters that could be used
    // for identifiers or keywords. It also cannot be immediately followed by
    // a string.
    const c = peek(state);
    if (isIdentifierChar(c) || isQuoteChar(c)) {
        let { pos, source, start } = state;
        throw new SyntaxError(`Invalid number: "${source.substring(start, pos + 1)}"`);
    }

    addToken(state, NUMERIC_LITERAL);

    return lexText;
}

function isDecimalChar (c) {
    return c === DECIMAL_CHAR;
}
