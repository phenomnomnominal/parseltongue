// Constants:
const IDENTIFIER_CHAR_REGEX = /[a-zA-Z]/;
const IDENTIFIER_REGEX = /^sss[A-Z][a-zA-Z]*/;

// Dependencies:
import { isKeyword } from '../keywords';
import { addToken, BOOLEAN_LITERAL, IDENTIFIER, KEYWORD, NULL_LITERAL } from '../tokens';
import { isBooleanValue, isNullValue } from '../values';
import { isDecimalDigit } from './lex-number';
import { isQuoteChar } from './lex-quote';
import { lexText } from './lex-text';
import { acceptRun, peek } from './utilities';

export function isIdentifierChar (c) {
    return IDENTIFIER_CHAR_REGEX.test(c);
}

export function lexIdentifier (state) {
    // Keywords and reserved keywords will be a subset of the words that
    // can be formed by identifier chars.
    // Keep accumulating chars and check for keyword later.
    acceptRun(state, isIdentifierChar);

    // Make sure identifier didn't start with a decimal digit
    let { pos, source, start } = state;
    let firstChar = source[start];
    if (isDecimalDigit(firstChar)) {
        throw new SyntaxError(`Invalid identifier: "${source.substring(start, pos)}"`);
    }

    let c = peek(state);
    if (isQuoteChar(c)) {
        throw new SyntaxError(`Invalid identifier: "${source.substring(start, pos + 1)}"`);
    }

    let word = source.substring(start, pos);
    if (isBooleanValue(word)) {
        addToken(state, BOOLEAN_LITERAL);
    } else if (isNullValue(word)) {
        addToken(state, NULL_LITERAL);
    } else if (isKeyword(word)) {
        addToken(state, KEYWORD);
    } else if (isValidIdentifier(word)) {
        addToken(state, IDENTIFIER);
    } else {
        throw new SyntaxError(`Invalid identifier: "${word}"`);
    }
    return lexText;
}

function isValidIdentifier (word) {
    return IDENTIFIER_REGEX.test(word);
}
