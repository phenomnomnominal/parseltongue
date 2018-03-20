// Dependencies:
import { ignore } from '../lexer';
import { EOF } from './tokens';
import { Token } from './token';

export function addToken (state, type) {
    let { pos, source, start } = state;
    let token = new Token(type, source.substring(start, pos), start, pos);
    token.loc = state.toLoc(start, pos);
    state.tokens.push(token);
    ignore(state);
}

export function getToken (state) {
    let { source, tokens, tokenIndex } = state;
    if (tokenIndex >= tokens.length) {
        return new Token(EOF, null, source.length, source.length);
    }

    let token = tokens[tokenIndex];
    state.tokenIndex++;
    return token;
}
