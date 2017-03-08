// Constants:
import { ASSIGNMENT } from '../operators';
import { ADD, DIVIDE, MODULO, MULTIPLY, SUBTRACT } from '../operators';
import { EQUALS, NOT_EQUALS } from '../operators';
import { GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL } from '../operators';
import { AND, OR } from '../operators';
import { NOT } from '../operators';
import { TO } from '../operators';

const BINARY_OPERATORS = [
    ADD, DIVIDE, MODULO, MULTIPLY, SUBTRACT,
    EQUALS, NOT_EQUALS,
    GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL,
    AND, OR
];
const UNARY_OPERATORS = [NOT];

// Utilities:
import { vomit } from './parser-utils';

// Dependencies:
import { BinaryExpression } from '../ast/binary-expression';
import { CallExpression } from '../ast/call-expression';
import { LogicalExpression } from '../ast/logical-expression';
import { UnaryExpression } from '../ast/unary-expression';
import { parseArray } from './parse-array';
import { parsePrimaryExpression } from './parse-expression';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';
import { matchSpace, expectSpace } from './parse-whitespace';

export function matchValue (state) {
    return matchPunctuators(state, ASSIGNMENT);
}

export function parseValue (identifier, state) {
    expectPunctuators(state, ASSIGNMENT);
    let exists = state.currentScope.identifiers[identifier.name];
    if (exists === 'function') {
        expectSpace(state);
        return parseArray(state);
    }

    let value = parseBinaryExpression(state, {
        requireSpace: true
    });
    return value;
}

export function parseBinaryExpression (state, options) {
    options = options || {};
    let left = parseUnaryExpression(state, options);
    if (matchSpace(state)) {
        expectSpace(state);
        if (matchPunctuators(state, TO)) {
            vomit(state);
            vomit(state);
            return left;
        }

        if (matchPunctuators(state, ASSIGNMENT)) {
            let args = parseValue(left, state);
            return new CallExpression(left, args.elements, left.loc);
        }

        while (matchPunctuators(state, BINARY_OPERATORS)) {
            let operatorToken = expectPunctuators(state, BINARY_OPERATORS);

            let right = parseBinaryExpression(state, {
                requireSpace: true
            });
            if (operatorToken.value === OR || operatorToken.value === AND) {
                return new LogicalExpression(operatorToken.value, left, right, left.loc);
            } else {
                return new BinaryExpression(operatorToken.value, left, right, left.loc);
            }
        }
    } else {
        return left;
    }
}

function parseUnaryExpression (state, options) {
    options = options || {};
    if (matchSpace(state) || options.requireSpace) {
        expectSpace(state);
    }

    if (matchPunctuators(state, UNARY_OPERATORS)) {
        let operatorToken = expectPunctuators(state, UNARY_OPERATORS);
        let argument = parseUnaryExpression(state, false);
        return new UnaryExpression(operatorToken.value, argument, true, operatorToken.loc);
    } else {
        return parsePrimaryExpression(state);
    }
}
