// Dependencies:
import { getToken } from '../tokens/tokens';

export function next (state) {
    let { lexState, tokens } = state;
    if (tokens.length > 0) {
        let [token] = tokens;
        return token;
    } else {
        let token = getToken(lexState);
        tokens.push(token);
        return token;
    }
}

export function consume (state) {
    let { tokens } = state;
    if (tokens.length === 0) {
        next(state);
    }
    return tokens.shift();
}

export function throwUnexpected (state, expected, token) {
    let message = 'Unexpected';
    if (expected) {
        message = `Expected "${expected}", but got`
    }
    let { type, value } = token || next(state);
    throw new SyntaxError(`${message} token of type "${type}" with value: "${value}"`);
}

export function vomit (state) {
    state.lexState.tokenIndex--;
    state.tokens = [];
}
