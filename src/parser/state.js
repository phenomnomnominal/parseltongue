// Dependencies:
import { createScope } from './scope';

export function createState (lexState) {
    let state = {
        expectedIndent: 0,
        tokens: [],
        lexState: {
            ...lexState,
            tokenIndex: 0
        }
    };
    state.currentScope = createScope(state);
    state.currentScope.identifiers = {
        'cast': 'function',
        'imperio': 'function',
        'crucio': 'function',
        'avadakedavra': 'function'
    };
    return state;
}
