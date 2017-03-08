// Constants:
const ESCAPE_CHAR = '\\';
const QUOTE_CHAR = '\'';

// Utilities:
import { acceptRun, next } from './lexer-utils';

// Dependencies:
import { lexText } from './lex-text';
import { isLineTerminator } from './lex-whitespace';
import { addToken } from '../tokens/tokens';
import { STRING_LITERAL } from '../tokens/token-types';

export function isQuoteChar (c) {
    return c === QUOTE_CHAR;
}

export function lexQuote (state, quoteChar) {
    return function() {
        let escapeEncountered = false;
        do {
            // Keep consuming characters unless we encounter line
            // terminator, the escape character, or the quote char.
            if (acceptRun(state, c => !(isLineTerminator(c) || isQuoteChar(c) || isEscpaeChar(c)))) {
                escapeEncountered = false;
            }

            let c = next(state);
            if (c === null) {
                let { pos, source, start } = state;
                // If we reached EOF without the closing quote char, then this string is incomplete.
                throw new SyntaxError(`Illegal token: "${source.substring(start, pos)}"`);
            } else if (!escapeEncountered) {
                if (isLineTerminator(c)) {
                    // If we reached EOL without encountering the
                    // ending quote char then this string is incomplete.
                    let { pos, source, start } = state;
                    throw new SyntaxError(`Illegal token: "${source.substring(start, pos)}"`);
                } else if (c === quoteChar) {
                    addToken(state, STRING_LITERAL);
                    return lexText;
                } else if (c === '\\') {
                    escapeEncountered = true;
                }
            } else {
                escapeEncountered = false;
            }
        } while(true);
    };
}

function isEscpaeChar (c) {
    return c === ESCAPE_CHAR;
}
