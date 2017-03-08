// Constants:
import { WHILE } from '../keywords';
import { ADD, LESS_THAN_OR_EQUAL, TO } from '../operators';

// Dependencies:
import { AssignmentExpression } from '../ast/assignment-expression';
import { BinaryExpression } from '../ast/binary-expression';
import { ForStatement } from '../ast/for-statement';
import { Literal } from '../ast/literal';
import { parseAssignment } from './parse-assignment';
import { parseBlock } from './parse-block';
import { expectKeywords } from './parse-keywords';
import { expectPunctuators } from './parse-punctuators';
import { parseBinaryExpression } from './parse-value';
import { expectSpace } from './parse-whitespace';

export function parseWhile (state) {
    let whileToken = expectKeywords(state, WHILE);
    expectSpace(state);

    let init = parseAssignment(state);
    let [startDeclaration] = init.declarations;
    let startIdentifier = startDeclaration.id;

    expectSpace(state);
    expectPunctuators(state, TO);

    let end = parseBinaryExpression(state);
    let test = new BinaryExpression(LESS_THAN_OR_EQUAL, startIdentifier, end, startIdentifier.loc);

    let update = new AssignmentExpression(startIdentifier, new BinaryExpression(ADD, startIdentifier, new Literal(1)), end.loc);

    let body = parseBlock(state);

    return new ForStatement(init, test, update, body, whileToken.loc);
}
