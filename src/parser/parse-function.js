// Constants:
import { ARRAY_END, ARRAY_START, SEPARATOR } from '../punctuators';

// Dependencies:
import { FunctionExpression } from '../ast';
import { parseBlock } from './parse-block';
import { matchIdentifier, expectIdentifier, transformIdentifier } from './parse-identifier';
import { matchPunctuators, expectPunctuators } from './parse-punctuators';
import { expectSpace } from './parse-whitespace';
import { createScope } from './scope';

export function matchFunction (state) {
    return matchPunctuators(state, ARRAY_START);
}

export function parseFunction (identifier, state) {
    let parameters = [];

    expectPunctuators(state, ARRAY_START);

    // Parse parameters:
    if (matchIdentifier(state)) {
        parameters.push(transformIdentifier(expectIdentifier(state)));
        while (matchPunctuators(state, SEPARATOR)) {
            expectPunctuators(state, SEPARATOR);
            expectSpace(state);
            parameters.push(transformIdentifier(expectIdentifier(state)));
        }
    }

    expectPunctuators(state, ARRAY_END);

    state.currentScope = createScope(state);
    let body = parseBlock(state, {
        insideFunction: true
    });
    state.currentScope = state.currentScope.parentScope;

    return new FunctionExpression(parameters, body, identifier.loc);
}
