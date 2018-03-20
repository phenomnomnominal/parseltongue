// Constants:
import { ADD, DIVIDE, MODULO, MULTIPLY, SUBTRACT } from '../operators';
import { EQUALS, NOT_EQUALS } from '../operators';
import { GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL } from '../operators';
import { AND, OR } from '../operators';
import { PRECEDENCE } from '../operators';

const BINARY_OPERATORS = [
    ADD, DIVIDE, MODULO, MULTIPLY, SUBTRACT,
    EQUALS, NOT_EQUALS,
    GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL,
    AND, OR
];

// Dependencies:
import { BinaryExpression, LogicalExpression } from '../ast';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';
import { parseUnaryExpression } from './parse-unary-expression';
import { matchSpace, expectSpace } from './parse-whitespace';
import { next } from './utilities';

export function parseBinaryExpression (state, minPrecedence = 0) {
    let { ast, lhs } = parseUnaryExpression(state);

    if (matchSpace(state)) {
        expectSpace(state);
    }

    while (matchPunctuators(state, BINARY_OPERATORS) && PRECEDENCE[next(state).value] >= minPrecedence) {
        // If any operator is encountered, then the result cannot be
        // LeftHandSideExpression anymore:
        lhs = false;

        const precedenceLevel = PRECEDENCE[next(state).value];
        const operator = expectPunctuators(state, BINARY_OPERATORS);

        if (matchSpace(state)) {
            expectSpace(state);
        }

        const right = parseBinaryExpression(state, precedenceLevel + 1);
        if (operator.value === OR || operator.value === AND) {
            ast = new LogicalExpression(operator.value, ast, right.ast);
        } else {
            ast = new BinaryExpression(operator.value, ast, right.ast);
        }
    }

    return {
        ast: ast,
        lhs: lhs
    };
}
