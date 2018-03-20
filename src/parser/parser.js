// Dependencies:
import { parseProgram } from './parse-program';
import { createState } from './state';

export function parse (lexState, options) {
    return parseProgram(createState(lexState), options);
}
