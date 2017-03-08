// Dependencies:
import { BlockStatement } from '../ast/block-statement';
import { parseExpression } from './parse-expression';
import { expectLineTerminator, matchIndent } from './parse-whitespace';

export function parseBlock (state) {
    let expressions = [];

    let lineTerminator = expectLineTerminator(state);

    state.expectedIndent += 1;
    while (matchIndent(state)) {
        expressions.push(parseExpression(state, {
            insideFunction: true
        }));
    }
    state.expectedIndent -= 1;

    return new BlockStatement(expressions, lineTerminator.loc);
}
