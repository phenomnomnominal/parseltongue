// Constants:
import { BOOLEAN_LITERAL, NUMERIC_LITERAL, NULL_LITERAL, STRING_LITERAL } from '../tokens';
import { QUOTE } from '../punctuators';
import { FALSE, NULL, TRUE } from '../values';

// Utilities:
import { Literal } from '../ast';
import { consume, next, throwUnexpected } from './utilities';

export function expectLiteral (state) {
    let token = consume(state);
    let { type, value } = token;
    if (!isLiteral(type)) {
        throwUnexpected(state, 'literal', token);
    }

    if (type === BOOLEAN_LITERAL) {
        value = castBoolean(value);
    }
    if (type === NUMERIC_LITERAL) {
        value = castNumber(value);
    }
    if (type === NULL_LITERAL) {
        value = castNull(value);
    }
    if (type === STRING_LITERAL) {
        value = castString(value);
    }

    return new Literal(value, token.loc);
}

export function isLiteral (type) {
    return type === BOOLEAN_LITERAL ||
        type === NUMERIC_LITERAL ||
        type === NULL_LITERAL ||
        type === STRING_LITERAL;
}

export function matchLiteral (state) {
    let { type } = next(state);
    return isLiteral(type);
}

function castBoolean (value) {
    if (value === TRUE) {
        return true;
    }
    if (value === FALSE) {
        return false;
    }
}

function castNumber (value) {
    let cast = +value;
    if (cast.toString() === value) {
        return cast;
    }
}

function castNull (value) {
    if (value === NULL) {
        return null;
    }
}

function castString (value) {
    if (value.startsWith(QUOTE) && value.endsWith(QUOTE)) {
        return value.replace(/^'/, '').replace(/'$/, '');
    }
}
