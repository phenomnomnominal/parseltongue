// Constants:
import { ASSIGNMENT } from '../operators';

// Dependencies:
import { ReturnStatement } from '../ast/return-statement';
import { expectPunctuators } from './parse-punctuators';
import { parseBinaryExpression } from './parse-value';
import { expectSpace, matchSpace } from './parse-whitespace';

export function parseReturn (state) {
    let returnToken = expectPunctuators(state, ASSIGNMENT);

    let returnExpression = null;
    if (matchSpace(state)) {
        expectSpace(state);
        returnExpression = parseBinaryExpression(state);
    }

    return new ReturnStatement(returnExpression, returnToken.loc);
}
