// Constants:
const IDENTIFIER_REGEX = /^sss/;
import { IDENTIFIER } from '../tokens/token-types';

// Utilities:
import lowerCaseFirst from 'lower-case-first';
import { consume, next, throwUnexpected } from './parser-utils';

// Dependencies:
import { Identifier } from '../ast/identifier';

export function expectIdentifier (state) {
    let token = consume(state);
    let { type, value } = token;
    if (type !== IDENTIFIER) {
        throwUnexpected(state, IDENTIFIER, token);
    }
    return new Identifier(value, token.loc);
}

export function matchIdentifier (state) {
    let { type } = next(state);
    return type === IDENTIFIER;
}

export function transformIdentifier (identifier) {
    let originalName = identifier.name;
    let transformedName = identifier.name.replace(IDENTIFIER_REGEX, '');
    identifier.name = lowerCaseFirst(transformedName);
    identifier.originalName = originalName;
    return identifier;
}
