// Utilities:
import { throwUnexpected } from './parser-utils';
import { isUndefined } from 'util';

// Dependencies:
import { AssignmentExpression } from '../ast/assignment-expression';
import { CallExpression } from '../ast/call-expression';
import { matchFunction, parseFunction } from './parse-function';
import { expectIdentifier, transformIdentifier } from './parse-identifier';
import { matchValue, parseValue } from './parse-value';
import { matchLineTerminator, expectSpace, matchSpace } from './parse-whitespace';
import { VariableDeclaration } from '../ast/variable-declaration';
import { VariableDeclarator } from '../ast/variable-declarator';

export function parseAssignment (state) {
    let initialValue;
    let identifier = transformIdentifier(expectIdentifier(state));
    let exists = state.currentScope.identifiers[identifier.name];

    if (matchSpace(state)) {
        expectSpace(state);
        if (matchValue(state)) {
            initialValue = parseValue(identifier, state);
            state.currentScope.identifiers[identifier.name] = 'value';
        } else if (matchFunction(state)) {
            initialValue = parseFunction(identifier, state);
            state.currentScope.identifiers[identifier.name] = 'function';
        }
    } else if (matchLineTerminator(state)) {
        state.currentScope.identifiers[identifier.name] = 'value';
        initialValue = null;
    }

    if (identifier.name === 'cast') {
        identifier.name = 'alert';
    }

    if (!isUndefined(initialValue)) {
        if (exists) {
            if (exists === 'value') {
                return new AssignmentExpression(identifier, initialValue, identifier.loc);
            }
            if (exists === 'function') {
                return new CallExpression(identifier, initialValue.elements, identifier.loc);
            }
        } else {
            return new VariableDeclaration([new VariableDeclarator(identifier, initialValue, identifier.loc)], identifier.loc);
        }
    }

    throwUnexpected(state);
}
