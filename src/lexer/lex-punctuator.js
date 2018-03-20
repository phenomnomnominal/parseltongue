// Constants:
const PUNCTUATOR_REGEX = /[!.+\-*/^%<>,[\]{}()&=~]/;

// Dependencies:
import { lexText } from './lex-text';
import { isPossiblyOperator } from '../operators';
import { isPunctuator } from '../punctuators';
import { addToken, PUNCTUATOR } from '../tokens';
import { accept, backup } from './utilities';

export function isPunctuatorChar (c) {
    return PUNCTUATOR_REGEX.test(c);
}

export function lexPunctuator (state) {
    // Handle valid punctuators next to each other. e.g. [[],[]];
    while (accept(state, isPunctuatorChar)) {
        let word = state.source.substring(state.start, state.pos);

        if (!isPunctuator(word) && !isPossiblyOperator(word)) {
            backup(state);
            addToken(state, PUNCTUATOR);
            return lexText;
        }
    }

    const word = state.source.substring(state.start, state.pos);
    if (isPunctuator(word)) {
        addToken(state, PUNCTUATOR);
        return lexText;
    }

    throw new SyntaxError(`Invalid punctuator: "${word}"`);
}
