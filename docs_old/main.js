/* global $:true window:true document:true localStorage:true */

// ROUTING EVENTS:
(() => {
    const $main = $('main');

    $(() => window.loadPage($main));
    window.addEventListener('popstate', () => window.loadPage($main));
    $(document).on('click', '#next', () => window.nextPage($main));
})();

// TIMER EVENTS:
(() => {
    const MAX_COUNTDOWN_TIME = 24 * 60;

    const $timer = $('#timer');

    let savedTime = localStorage.getItem('savedTime') || MAX_COUNTDOWN_TIME;
    window.timer(savedTime, time => {
        const minutes = `${Math.floor(time / 60)}`.padStart(2, '0');
        const seconds = `${time % 60}`.padStart(2, '0');
        const remaining = `00:${minutes}:${seconds}`;
        $timer.html(remaining);
        localStorage.setItem('savedTime', time);
        if (time <= 0) {
            localStorage.removeItem('savedTime');
            time = MAX_COUNTDOWN_TIME;
        }
    });
})();
