import { generate } from './code-generator';
import { lex } from './lexer/lexer';
import { lint } from './linter/linter';
import { parse } from './parser/parser';

export { generate } from './code-generator';
export { lex } from './lexer';
export { lint } from './linter';
export { parse } from './parser';

export function parseltongue (scriptPath, pt) {
    return generate(lint(parse(lex(pt, scriptPath))), scriptPath, pt);
}
