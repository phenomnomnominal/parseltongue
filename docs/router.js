/* global $:true window:true location:true */

// ROUTING UTILS:

function loadPage (container) {
    load(getPage() || 1, container);
}

function nextPage (container) {
    load(getPage() + 1, container)
}

async function load (demo, container) {
    const result = await $.get(`./demos/${demo}.html`);
    location.hash = demo;
    container.html(result);
}

function getPage () {
    return +location.hash.replace(/^#/, '');
}

window.loadPage = loadPage;
window.nextPage = nextPage;
