import '@babel/polyfill';

import { generate } from './code-generator';
import { lex } from './lexer';
import { lint } from './linter';
import { parse } from './parser';

export { generate } from './code-generator';
export { lex } from './lexer';
export { lint } from './linter';
export { parse } from './parser';
export { regex } from './regex';

export function parseltongue (scriptPath, pt, options = {}) {
    return generate(lint(parse(lex(pt, scriptPath), options)), scriptPath, pt);
}
