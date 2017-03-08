// Dependencies:
import { Program } from '../ast/program';
import { matchExpression, parseExpression } from './parse-expression';

export function parseProgram (state) {
    let body = [];

    while (hasTokens(state) && matchExpression(state)) {
        let expression = parseExpression(state);
        if (expression) {
            body.push(expression);
        }
    }

    return new Program(body);
}

function hasTokens (state) {
    return state.lexState.tokenIndex < state.lexState.tokens.length
}
