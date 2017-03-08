// Dependencies:
import { ignore } from '../lex-utils';

export function addToken (state, type) {
    let { pos, source, start } = state;
    const token = new Token(type, source.substring(start, pos), start, pos);
    state.tokens.push(token);
    ignore(state);
}

class Token {
    constructor (type, value, from, to) {
        this.type = type;
        this.value = value;
        this.from = from;
        this.to = to;
    }
}
