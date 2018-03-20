// Dependencies:
import { Program } from '../ast';
import { matchStatement, parseStatement } from './parse-statement';

export function parseProgram (state) {
    let body = [];

    while (hasTokens(state) && matchStatement(state)) {
        let statement = parseStatement(state);
        if (statement) {
            body.push(statement);
        }
    }

    return new Program(body);
}

function hasTokens (state) {
    return state.lexState.tokenIndex < state.lexState.tokens.length;
}
