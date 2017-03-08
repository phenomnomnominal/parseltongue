// Constants:
const IMPERIO = 'imperio'
const CRUCIO = 'crucio'
const AVADAKEDAVRA = 'avadakedavra'

// Dependencies:
import esquery from 'esquery';

export function lint (ast) {
    let unforgivableCurses =  [IMPERIO, CRUCIO, AVADAKEDAVRA];

    unforgivableCurses.forEach(unforgivable => {
        let nodes = esquery.query(ast, `CallExpression[callee.name="${unforgivable}"] Identifier`);
        nodes.forEach(identifier => identifier.name = 'alert');
    });

    return ast;
}
