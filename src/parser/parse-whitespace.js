// Utilities:
import { consume, next, throwUnexpected } from './parser-utils';

// Dependencies:
import { EOF, INDENT, LINE_TERMINATOR, SPACE } from '../tokens/token-types';

export function expectEOF (state) {
    let token = consume(state);
    if (token.type !== EOF) {
        throwUnexpected(state, EOF, token);
    }
    return token;
}

export function matchEOF (state) {
    let { type } = next(state);
    return type === EOF;
}

export function expectIndent (state) {
    let token = consume(state);
    if (token.type !== INDENT) {
        throwUnexpected(state, INDENT, token);
    }
    return token;
}

export function matchIndent (state) {
    let { type } = next(state);
    return type === INDENT;
}

export function expectLineTerminator (state) {
    let token = consume(state);
    if (token.type !== LINE_TERMINATOR) {
        throwUnexpected(state, LINE_TERMINATOR, token);
    }
    return token;
}

export function expectLineTerminatorOrEOF (state) {
    let token = consume(state);
    let { type } = token;
    if (type !== LINE_TERMINATOR && type !== EOF) {
        throwUnexpected(state, `${LINE_TERMINATOR} or ${EOF}`, token);
    }
    return token;
}

export function matchLineTerminator (state) {
    let { type } = next(state);
    return type === LINE_TERMINATOR;
}

export function matchLineTerminatorOrEOF (state) {
    return matchLineTerminator(state) ||
        matchEOF(state);
}

export function expectSpace (state) {
    let token = consume(state);
    if (token.type !== SPACE) {
        throwUnexpected(state, SPACE, token);
    }
    return token;
}

export function matchSpace (state) {
    let { type } = next(state);
    return type === SPACE;
}
