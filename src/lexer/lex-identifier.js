// Constants:
const FALSE = 'false';
const IDENTIFIER_CHAR_REGEX = /[a-zA-Z]/;
const IDENTIFIER_REGEX = /^sss[A-Z][a-zA-Z]*/;
const NULL = 'null';
const TRUE = 'true';

// Utilities:
import { acceptRun, peek } from './lexer-utils';

// Dependencies:
import { ELSE, ELSEIF, IF, WHILE } from '../keywords';
import { isDecimalDigit } from './lex-number';
import { isQuoteChar } from './lex-quote';
import { lexText } from './lex-text';
import { addToken } from '../tokens/tokens';
import { BOOLEAN_LITERAL, IDENTIFIER, KEYWORD, NULL_LITERAL } from '../tokens/token-types';

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
    if (word === TRUE || word === FALSE) {
        addToken(state, BOOLEAN_LITERAL);
    } else if (word === NULL) {
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

function isKeyword (word) {
    return [ELSE, ELSEIF, IF, WHILE].includes(word);
}

function isValidIdentifier (word) {
    return IDENTIFIER_REGEX.test(word);
}
