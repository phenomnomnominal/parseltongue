// Utilities:
import { backup, next, peek } from './lex-utils';

// Dependencies:
import { EOF, isEOF } from './lex-eof';
import { isIdentifierChar, lexIdentifier } from './lex-identifier';
import { isDecimalDigit, lexNumber } from './lex-number';
import { isPunctuatorChar, lexPunctuator } from './lex-punctuator';
import { isQuoteChar, lexQuote } from './lex-quote';
import { isWhitespaceChar, lexWhitespace } from './lex-whitespace';

export function lexText (state) {
    let c = next(state);
    if (isEOF(c)) {
        return EOF;
    } else if (isQuoteChar(c)) {
        return lexQuote(state, c);
    } else if (isDecimalDigit(c) || (c === '.' && isDecimalDigit(peek(state)))) {
        backup(state);
        return lexNumber;
    } else if (isWhitespaceChar(c)) {
        backup(state);
        return lexWhitespace;
    } else if (isPunctuatorChar(c)) {
        backup(state);
        return lexPunctuator;
    } else if (isIdentifierChar(c)) {
        backup(state);
        return lexIdentifier;
    } else {
        throw new SyntaxError(`Unexpected character: "${c}"`);
    }
}
