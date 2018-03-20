// Dependencies
import { fromObject } from 'convert-source-map';
import * as escodegen from 'escodegen';

export function generate (ast, scriptPath, pt) {
    let output = escodegen.generate(ast, {
        sourceMap: true,
        sourceMapWithCode: true
    });
    output.map.setSourceContent(scriptPath, pt);
    return `${output.code}\n\n${fromObject(output.map.toJSON()).toComment()}`;
}
