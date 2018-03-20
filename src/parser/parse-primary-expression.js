// Constants:
import { GROUPING_END, GROUPING_START } from '../punctuators';

// Dependencies:
import { matchArray, parseArray } from './parse-array';
import { parseAssignment } from './parse-assignment';
import { matchIdentifier, expectIdentifier, transformIdentifier } from './parse-identifier';
import { matchLiteral, expectLiteral } from './parse-literal';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';

export function matchPrimaryExpression (state) {
    return matchLiteral(state) ||
        matchIdentifier(state) ||
        matchPunctuators(state, GROUPING_START);
}

export function parsePrimaryExpression (state) {
    if (matchLiteral(state)) {
        return expectLiteral(state);
    } else if (matchIdentifier(state)) {
        return transformIdentifier(expectIdentifier(state));
    } else if (matchArray(state)) {
        return parseArray(state);
    } else if (matchPunctuators(state, GROUPING_START)) {
        expectPunctuators(state, GROUPING_START);
        let expression = parseAssignment(state);
        expectPunctuators(state, GROUPING_END);
        return expression;
    }
    return null;
}
