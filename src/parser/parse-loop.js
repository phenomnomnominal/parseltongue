// Constants:
import { LOOP } from '../keywords';
import { ADD, LESS_THAN, TO } from '../operators';

// Dependencies:
import { AssignmentExpression, BinaryExpression, ForStatement, Literal } from '../ast';
import { parseAssignment } from './parse-assignment';
import { parseBinaryExpression } from './parse-binary-expression';
import { parseBlock } from './parse-block';
import { expectKeywords } from './parse-keywords';
import { expectPunctuators } from './parse-punctuators';
import { expectSpace } from './parse-whitespace';

export function parseLoop (state) {
    let whileToken = expectKeywords(state, LOOP);
    expectSpace(state);

    let init = parseAssignment(state);
    let [startDeclaration] = init.declarations;
    let startIdentifier = startDeclaration.id;

    let to = expectPunctuators(state, TO);
    expectSpace(state);

    let end = parseBinaryExpression(state);
    let test = new BinaryExpression(LESS_THAN, startIdentifier, end.ast, startIdentifier.loc);

    let update = new AssignmentExpression(startIdentifier, new BinaryExpression(ADD, startIdentifier, new Literal(1, to.loc), test.loc), end.loc);

    let body = parseBlock(state, {
        insideFunction: false
    });

    return new ForStatement(init, test, update, body, whileToken.loc);
}
