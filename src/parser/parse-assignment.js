// Constants:
import { ASSIGNMENT } from '../operators';

// Utilities:
import { throwUnexpected } from './utilities';
import { isUndefined } from 'util';

// Dependencies:
import { AssignmentExpression, CallExpression, VariableDeclaration, VariableDeclarator } from '../ast';
import { parseArray } from './parse-array';
import { parseAssignmentExpression } from './parse-assignment-expression';
import { matchFunction, parseFunction } from './parse-function';
import { expectIdentifier, transformIdentifier } from './parse-identifier';
import { expectPunctuators, matchPunctuators } from './parse-punctuators';
import { matchLineTerminator, expectSpace, matchSpace } from './parse-whitespace';

export function parseAssignment (state) {
    let identifier = transformIdentifier(expectIdentifier(state));
    let { identifiers } = state.currentScope;
    let exists = identifiers[identifier.name];

    if (exists) {
        if (matchSpace(state)) {
            expectSpace(state);
            if (matchPunctuators(state, ASSIGNMENT)) {
                expectPunctuators(state, ASSIGNMENT);
                expectSpace(state);
                if (exists === 'function') {
                    if (identifier.name === 'cast') {
                        identifier.name = 'alert';
                    }
                    return new CallExpression(identifier, parseArray(state).elements, identifier.loc);
                } else {
                    return new AssignmentExpression(identifier, parseAssignmentExpression(state), identifier.loc);
                }
            }
        } else if (matchLineTerminator(state)) {
            return new AssignmentExpression(identifier, null, identifier.loc);
        }
    }

    let initialiser;
    if (matchSpace(state)) {
        expectSpace(state);
        if (matchPunctuators(state, ASSIGNMENT)) {
            expectPunctuators(state, ASSIGNMENT);
            expectSpace(state);
            initialiser = parseAssignmentExpression(state);
            identifiers[identifier.name] = 'value';
        } else if (matchFunction(state)) {
            initialiser = parseFunction(identifier, state);
            identifiers[identifier.name] = 'function';
        }
    } else if (matchLineTerminator(state)) {
        identifiers[identifier.name] = 'value';
        initialiser = null;
    }

    if (!isUndefined(initialiser)) {
        return new VariableDeclaration([new VariableDeclarator(identifier, initialiser, identifier.loc)], identifier.loc);
    }

    throwUnexpected(state);
}
