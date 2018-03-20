import { parseltongue } from './index';

let { document, fetch } = global;

let scripts = Array.from(document.querySelectorAll('script[type="text/parseltongue"]'));

scripts.forEach(async script => {
    let src = script.getAttribute('src');
    if (src) {
        let result = await fetch(src);
        let pt = await result.text();
        let js = parseltongue(src, pt);
        script.parentNode.removeChild(script);
        script = document.createElement('script');
        script.innerText = js;
        document.head.appendChild(script);
    }
});
