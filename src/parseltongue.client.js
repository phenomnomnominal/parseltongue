import { generate, lex, lint, parse, parseltongue, regex } from './index';
let { document, fetch } = global;

global.parseltongue = {
    generate,
    lex,
    lint,
    load,
    parse,
    parseltongue,
    regex,
    run
};

async function load (url) {
    let result = await fetch(url);
    let pt = await result.text();
    return pt;
}

async function run (js) {
    let script = document.createElement('script');
    script.innerHTML = js;
    document.head.appendChild(script);
}
