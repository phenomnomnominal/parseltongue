// Constants:
import { ASSIGNMENT } from '../operators';

// Dependencies:
import { CallExpression } from '../ast';
import { parseArray } from './parse-array';
import { parsePrimaryExpression } from './parse-primary-expression';
import { expectPunctuators, matchPunctuators } from './parse-punctuators';
import { expectSpace, matchSpace } from './parse-whitespace';
import { vomit } from './utilities';

export function parseCall (state) {
    let expression = parsePrimaryExpression(state);

    if (matchSpace(state)) {
        expectSpace(state);
        if (matchPunctuators(state, ASSIGNMENT)) {
            expectPunctuators(state, ASSIGNMENT);
            expectSpace(state);
            return new CallExpression(expression, parseArray(state).elements, expression.loc);
        } else {
            vomit(state);
        }
    }

    return expression;
}
