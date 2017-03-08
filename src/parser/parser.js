// Dependencies:
import { parseProgram } from './parse-program';
import { createState } from './parser-state';

export function parse (lexState) {
    let state = createState(lexState);
    return parseProgram(state);
}
