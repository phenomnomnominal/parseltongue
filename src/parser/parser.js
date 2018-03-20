// Dependencies:
import { parseProgram } from './parse-program';
import { createState } from './state';

export function parse (lexState) {
    return parseProgram(createState(lexState));
}
