// Constants:
import { ASSIGNMENT } from '../operators';

// Dependencies:
import { ReturnStatement } from '../ast';
import { parseBinaryExpression } from './parse-binary-expression';
import { expectPunctuators } from './parse-punctuators';
import { expectSpace, matchSpace } from './parse-whitespace';

export function parseReturn (state) {
    let returnToken = expectPunctuators(state, ASSIGNMENT);

    let returnExpression = null;
    if (matchSpace(state)) {
        expectSpace(state);
        returnExpression = parseBinaryExpression(state).ast;
    }

    return new ReturnStatement(returnExpression, returnToken.loc);
}
