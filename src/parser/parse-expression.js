// Constants:
import { IF, WHILE } from '../keywords';
import { ASSIGNMENT } from '../operators';
import { GROUPING_END, GROUPING_START } from '../punctuators';

// Utilities:
import { isUndefined } from 'util';
import { throwUnexpected } from './parser-utils';

// Dependencies:
import { matchArray, parseArray } from './parse-array';
import { parseAssignment } from './parse-assignment';
import { matchIdentifier, expectIdentifier, transformIdentifier } from './parse-identifier';
import { matchKeywords } from './parse-keywords';
import { matchLiteral, expectLiteral } from './parse-literal';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';
import { parseReturn } from './parse-return';
import { parseBinaryExpression } from './parse-value';
import { parseWhile } from './parse-while';
import { expectIndent, matchLineTerminatorOrEOF, expectLineTerminatorOrEOF } from './parse-whitespace';

export function matchExpression (state) {
    return matchLineTerminatorOrEOF(state) ||
        matchIdentifier(state) ||
        matchKeywords(state, [IF, WHILE]) ||
        matchPunctuators(state, ASSIGNMENT);
}

export function parseExpression (state, options) {
    options = options || {};

    if (matchLineTerminatorOrEOF(state)) {
        expectLineTerminatorOrEOF(state);
        return null;
    }

    let { expectedIndent } = state;
    while (expectedIndent) {
        expectIndent(state);
        expectedIndent -= 1;
    }

    let expression;
    if (matchIdentifier(state)) {
        expression = parseAssignment(state);
    } else if (matchKeywords(state, WHILE)) {
        expression = parseWhile(state);
    } else if (matchPunctuators(state, ASSIGNMENT)) {
        if (options.insideFunction) {
            expression = parseReturn(state);
        } else {
            throw new SyntaxError('Return statement can only be inside a function');
        }
    }

    if (isUndefined(expression)) {
        throwUnexpected(state);
    } else {
        expectLineTerminatorOrEOF(state);
        return expression;
    }
}

export function parsePrimaryExpression (state) {
    if (matchLiteral(state)) {
        return expectLiteral(state);
    } else if (matchArray(state)) {
        return parseArray(state);
    } else if (matchIdentifier(state)) {
        return transformIdentifier(expectIdentifier(state));
    } else if (matchPunctuators(state, GROUPING_START)) {
        expectPunctuators(state, GROUPING_START);
        let expression = parseBinaryExpression(state, {
            requireSpace: false
        });
        expectPunctuators(state, GROUPING_END);
        return expression;
    }
    return null;
}
