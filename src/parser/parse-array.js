// Constants:
import { ARRAY_END, ARRAY_START, SEPARATOR } from '../punctuators';

// Dependencies:
import { ArrayExpression } from '../ast';
import { parseBinaryExpression } from './parse-binary-expression';
import { expectPunctuators, matchPunctuators } from './parse-punctuators';
import { expectSpace } from './parse-whitespace';

export function matchArray (state) {
    return matchPunctuators(state, ARRAY_START);
}

export function parseArray (state) {
    let arrayToken = expectPunctuators(state, ARRAY_START);

    let elements = [];
    if (!matchPunctuators(state, ARRAY_END)) {
        elements.push(parseBinaryExpression(state).ast);
        while (!matchPunctuators(state, ARRAY_END)) {
            expectPunctuators(state, SEPARATOR);
            expectSpace(state);
            elements.push(parseBinaryExpression(state).ast);
        }
    }
    expectPunctuators(state, ARRAY_END);

    return new ArrayExpression(elements, arrayToken.loc);
}
