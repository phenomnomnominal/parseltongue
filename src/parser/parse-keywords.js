// Constants:
import { KEYWORD } from '../tokens';

// Utilities:
import { consume, next, throwUnexpected } from './utilities';

export function expectKeywords (state, keywords) {
    let token = consume(state);
    let { type, value } = token;
    if (type !== KEYWORD) {
        throwUnexpected(state, KEYWORD, token);
    }

    if (Array.isArray(keywords)) {
        if (!keywords.includes(value)) {
            throwUnexpected(state, `one of [${keywords}]`, token);
        }
    } else if (value !== keywords) {
        throwUnexpected(state, keywords, token);
    }

    return token;
}

export function matchKeywords (state, keywords) {
    let { type, value } = next(state);
    if (type !== KEYWORD) {
        return false;
    }

    if (Array.isArray(keywords)) {
        return keywords.includes(value);
    } else {
        return value === keywords;
    }
}
