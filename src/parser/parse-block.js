// Dependencies:
import { BlockStatement } from '../ast';
import { matchStatement, parseStatement } from './parse-statement';
import { expectLineTerminatorOrEOF, matchLineTerminatorOrEOF, consumeIndents, matchIndent } from './parse-whitespace';
import { vomit } from './utilities';

export function parseBlock (state, options) {
    let statements = [];

    let lineTerminator = expectLineTerminatorOrEOF(state);

    state.expectedIndent += 1;

    while (matchIndent(state)) {
        let indents = consumeIndents(state);
        if (indents.length === state.expectedIndent && matchStatement(state)) {
            let statement = parseStatement(state, options);
            if (statements) {
                statements.push(statement);
            }
        }
    }
    state.expectedIndent -= 1;

    while (!matchLineTerminatorOrEOF(state)) {
        vomit(state);
    }

    return new BlockStatement(statements, lineTerminator.loc);
}
