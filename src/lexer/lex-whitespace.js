// Constants:
const SPACE_REGEX = / /;
const WHITE_SPACE_REGEX = /\s/;

// Utilities:
import { acceptRun, peek } from './lexer-utils';

// Dependencies:
import { lexText } from './lex-text';
import { INDENT, LINE_TERMINATOR, SPACE } from '../tokens/token-types';
import { addToken } from '../tokens/tokens';

export function isLineTerminator (c) {
    return !!(c === '\n');
}

export function isWhitespaceChar (c) {
    return WHITE_SPACE_REGEX.test(c);
}

export function lexWhitespace (state) {
    if (acceptRun(state, isLineTerminator)) {
        let { pos, source, start } = state;
        let word = source.substring(start, pos);
        let lines = word.split(/\n/).length - 1;
        state.pos = start;
        while (lines) {
            state.pos += 1;
            addToken(state, LINE_TERMINATOR);
            lines -= 1;
        }
        return lexText;
    }

    if (acceptRun(state, isSpace)) {
        let { pos, source, start } = state;
        let word = source.substring(start, pos);
        if (word.length === 1) {
            addToken(state, SPACE);
            return lexText;
        }
        if (word.length % 4 === 0) {
            let indents = word.length / 4;
            state.pos = start;
            while (indents) {
                state.pos += 4;
                addToken(state, INDENT);
                indents -= 1;
            }
            return lexText;
        }

        throw new SyntaxError(`Invalid spaces: "${word}"`);
    }

    let c = peek(state);
    throw new SyntaxError(`Invalid whitespace: "${c}"`);
}

function isSpace (c) {
    return SPACE_REGEX.test(c);
}
