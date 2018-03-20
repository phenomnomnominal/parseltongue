// Constants:
import { IF, LOOP } from '../keywords';
import { ASSIGNMENT } from '../operators';

// Dependencies:
import { ExpressionStatement, Statement } from '../ast';
import { parseAssignment } from './parse-assignment';
import { matchPrimaryExpression } from './parse-primary-expression';
import { matchIdentifier } from './parse-identifier';
import { parseIf } from './parse-if';
import { matchKeywords } from './parse-keywords';
import { matchPunctuators } from './parse-punctuators';
import { parseReturn } from './parse-return';
import { matchUnaryExpression } from './parse-unary-expression';
import { parseLoop } from './parse-loop';
import { expectLineTerminator, expectLineTerminatorOrEOF, matchLineTerminator } from './parse-whitespace';

export function matchStatement (state) {
    return matchLineTerminator(state) ||
        matchIdentifier(state) ||
        matchKeywords(state, [IF, LOOP]) ||
        matchPunctuators(state, ASSIGNMENT) ||
        matchUnaryExpression(state) ||
        matchPrimaryExpression(state);
}

export function parseStatement (state, options) {
    options = options || {};

    if (matchLineTerminator(state)) {
        expectLineTerminator(state);
        return null;
    }

    let statement;
    if (matchIdentifier(state)) {
        statement = parseExpressionStatement(state);
    }
    if (matchKeywords(state, IF)) {
        statement = parseIf(state, options);
    }
    if (matchKeywords(state, LOOP)) {
        statement = parseLoop(state);
    }
    if (matchPunctuators(state, ASSIGNMENT)) {
        if (!options.insideFunction) {
            throw new SyntaxError('Return statement can only be inside a function');
        }
        statement = parseReturn(state);
    }

    if (!statement) {
        throw new SyntaxError(`Unexpected token`);
    }

    expectLineTerminatorOrEOF(state);

    return statement;
}

function parseExpressionStatement (state) {
    let assignment = parseAssignment(state);
    if (assignment instanceof Statement) {
        return assignment;
    }
    return new ExpressionStatement(assignment, assignment.loc);
}
