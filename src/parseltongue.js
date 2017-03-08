// Constants:
const PARSELTONGUE_EXT = '.pt';
const JAVASCRIPT_EXT = '.js';

// Utilities:
import { promisifyAll } from 'bluebird';
import * as path from 'path';

// Dependencies:
import { fromObject } from 'convert-source-map';
import * as escodegen from 'escodegen';
const fs = promisifyAll(require('fs'));
import { lex } from './lexer/lexer';
import { lint } from './linter/linter';
import { parse } from './parser/parser';

if (!global.document) {
    let scriptPath = path.resolve(process.cwd(), process.argv[2]);
    fs.readFileAsync(scriptPath, 'utf8')
    .then(pt => {
        let js = parseltongue(scriptPath, pt);
        return fs.writeFileAsync(scriptPath.replace(PARSELTONGUE_EXT, JAVASCRIPT_EXT), js)
    });
} else {
    let { document, fetch } = global;
    let scripts = Array.from(document.querySelectorAll('script[type="text/parseltongue"]'));
    scripts.forEach(script => {
        let src = script.getAttribute('src');
        if (src) {
            fetch(src)
            .then(result => result.text())
            .then(pt => {
                let js = parseltongue(src, pt);
                script.parentNode.removeChild(script);
                script = document.createElement('script');
                script.innerText = js;
                document.head.appendChild(script);
            });
        }
    });
}

function parseltongue (scriptPath, pt) {
    let lexed = lex(pt, scriptPath);
    let ast = parse(lexed);
    let linted = lint(ast);

    let output = escodegen.generate(linted, {
        sourceMap: true,
        sourceMapWithCode: true
    });
    output.map.setSourceContent(scriptPath, pt);
    return `${output.code}\n\n${fromObject(output.map.toJSON()).toComment()}`;
}
