// Dependencies:
import { createState } from './state';

export function lex (sourceText, sourcePath) {
    let state = createState(sourceText, sourcePath);
    
    do {
        state.stateFn = state.stateFn(state);
    } while (state.stateFn !== null);

    return state;
}
