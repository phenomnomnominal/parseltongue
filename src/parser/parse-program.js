// Dependencies:
import { DebuggerStatement, Program } from '../ast';
import { matchStatement, parseStatement } from './parse-statement';

export function parseProgram (state, options = {}) {
    let body = [];

    if (options.debug) {
        body.push(new DebuggerStatement({
            start: { line: 0, column: 0 },
            end: { line: 0, column: 0 }
        }));
    }

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
