/* global window:true document:true */

// SCRIPT INJECTION UTILS:

window.inject = function (src, type) {
    let script = document.createElement('script');
    script.src = src;
    if (type) {
        script.type = type;
    }
    document.head.appendChild(script);
    script.addEventListener('load', () => {
        script.parentNode.removeChild(script);
    });
}
