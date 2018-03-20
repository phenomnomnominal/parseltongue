// Constants:
import { NOT } from '../operators';

// Dependencies:
import { UnaryExpression } from '../ast';
import { parseCall } from './parse-call';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';

export function matchUnaryExpression (state) {
    return matchPunctuators(state, NOT);
}

export function parseUnaryExpression (state) {
    if (matchPunctuators(state, NOT)) {
        expectPunctuators(state, NOT);
        const unary = parseUnaryExpression(state);

        let ast = new UnaryExpression(NOT, unary.ast, true);

        return {
            ast: ast,
            lhs: false
        };
    }

    return {
        ast: parseCall(state),
        lhs: true
    };
}
