// Constants:
import { ASSIGNMENT } from '../operators';

// Dependencies:
import { AssignmentExpression } from '../ast';
import { parseBinaryExpression } from './parse-binary-expression';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';

export function parseAssignmentExpression (state) {
    // We don't initally know whether to parse as BinaryExpression or
    // AssignmentExpression. We'll only know that later if we come across
    // things that cannot be in LeftHandSideExpression.
    let { ast, lhs } = parseBinaryExpression(state);
    if (lhs) {
        if (matchPunctuators(state, ASSIGNMENT)) {
            expectPunctuators(state, ASSIGNMENT);
            return new AssignmentExpression(ast, parseAssignmentExpression(state), ast.loc);
        }
    }
    return ast;
}
