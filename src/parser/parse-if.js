// Constants:
import { ELSE, ELSEIF, IF } from '../keywords';

// Dependencies:
import { IfStatement } from '../ast';
import { parseBinaryExpression } from './parse-binary-expression';
import { parseBlock } from './parse-block';
import { expectKeywords, matchKeywords } from './parse-keywords';
import { consumeIndents, expectLineTerminator, expectSpace, matchLineTerminator } from './parse-whitespace';

export function parseIf (state, options) {
    if (!options.isAlternate) {
        expectKeywords(state, IF);
        expectSpace(state);
    }

    const test = parseBinaryExpression(state).ast;

    const consequent = parseBlock(state, options);

    if (consequent === null) {
        throw new SyntaxError('Expecting statement for if-statement');
    }

    if (matchLineTerminator(state)) {
        expectLineTerminator(state);
        consumeIndents(state);
    }

    let alternate = null;
    if (matchKeywords(state, [ELSE, ELSEIF])) {
        if (matchKeywords(state, ELSE)) {
            expectKeywords(state, ELSE);
            alternate = parseBlock(state, options);
        } else if (matchKeywords(state, ELSEIF)) {
            expectKeywords(state, ELSEIF);
            expectSpace(state);
            alternate = parseIf(state, { ...options, isAlternate: true });
        }

        if (alternate === null) {
            throw new SyntaxError('Expecting statement for else block in if-statement');
        }
    }

    return new IfStatement(test, consequent, alternate, test.loc);
}
