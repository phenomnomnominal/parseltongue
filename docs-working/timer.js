/* global window:true */

// TIMER UTILS:

// const beep = (() => {
//     let ctx = new window.AudioContext();
//     return duration => {
//         let osc = ctx.createOscillator();
//         osc.connect(ctx.destination);
//         osc.start();
//         setTimeout(() => osc.stop(), duration);
//     };
// })();

function timer (time, tick) {
    const interval = setInterval(() => {
        time -= 1;
        if (time === 0) {
            clearInterval(interval);
        }
        tick(time);
        // beep(150);
    }, 1000);
    return interval;
}

window.timer = timer;
