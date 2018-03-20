// Constants:
import { isEOF, EOF } from './lex-eof';

export function accept (state, validator) {
    const c = peek(state);
    if (!isEOF(c) && validator(c)) {
        state.pos++;
        return true;
    }
    return false;
}

export function acceptRun (state, validator) {
    let c;
    let startedAt = state.pos;
    do {
        c = peek(state);
        if (isEOF(c)) {
            break;
        }
    } while (validator(c) && ++state.pos);

    return state.pos > startedAt;
}

export function backup (state) {
    state.pos--;
}

export function ignore (state) {
    state.start = state.pos;
}

export function next (state) {
    const c = peek(state);
    if (!isEOF(c)) {
        state.pos++;
    }
    return c;
}

export function peek (state) {
    if (state.pos >= state.source.length) {
        return EOF;
    }
    return state.source[state.pos];
}
