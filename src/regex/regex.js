export function regex (pt) {
    let lines = pt.split(/\n/);
    let js = lines.map(line => {
        let [parsed] = [
            findVariableAssignment,
            findWhileLoop,
            findFunctionDeclaration
        ].map(parser => parser(line)).filter(Boolean);
        return parsed;
    }).join('\n');
    return js;
}

function findVariableAssignment (line) {
    let result = line.match(/^( {4})*sss([a-zA-Z]*) <~ (.*)/);

    if (result) {
        let [, , name, value] = result;
        return `var ${lowerCaseFirst(name)} = ${value};`;
    }
    return null;
}

function findWhileLoop (line) {
    let whileLoop = /^( {4})*sssss sss([a-zA-z]+) <~ (.*) ~> (.*)/;
    let result = line.match(whileLoop);

    if (result) {
        let [, , indexer, from, to] = result;
        let i = lowerCaseFirst(indexer);
        return `for (var ${i} = ${from}; i < ${to}; i += 1) {`;
    }
    return null;
}

function findFunctionDeclaration (line) {
    let fdr = /^( {4})*sss([a-zA-z]+) \[(?:sss([a-zA-Z]+), )*sss([a-zA-z]+)\]/;
    let result = line.match(fdr);

    if (result) {
        let [, , name, ...parameters] = result;
        let params = parameters.join(', ');
        return `function ${lowerCaseFirst(name)} (${params}) {`;
    }
    return null;
}

function lowerCaseFirst (str) {
    return `${str[0].toLowerCase()}${str.substr(1)}`;
}
