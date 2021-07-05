const btn_notes = document.querySelector('.btn-notes');
const btn_letters = document.querySelector('.btn-letters');
const arr = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');
let flag = true;

// play Audio
const elem = async (src) => {
    const audio = new Audio();
    if (src) {
        audio.src = src;
        await audio.play();
    }
}

// btn switch notes mode
btn_notes.addEventListener('click', () => {
    btn_notes.classList.add('btn-active');
    btn_letters.classList.remove('btn-active');
    for (let elem of arr) {
        elem.classList.remove('piano-key-letter');
    }
    flag = true;
    play(flag);
});

// btn switch letters mode
btn_letters.addEventListener('click', () => {
    btn_letters.classList.add('btn-active');
    btn_notes.classList.remove('btn-active');
    for (let elem of arr) {
        elem.classList.add('piano-key-letter');
    }
    flag = false;
    play(flag);
});

// event Keypress note
const eventKeypress = async Event => {
    const key_pick = [...document.querySelectorAll('.piano-key')]
        .find(el => 'Key' + el.getAttribute('data-letter') === Event.code);
    if (key_pick !== undefined) {
        const src = key_pick?.getAttribute('data-src');
        key_pick?.classList.add('piano-key-active', 'piano-key-active-pseudo');
        await elem(src);
        setTimeout(() => {
            arr.forEach(element => {
                if (element.classList.contains('piano-key-active')) {
                    key_pick.classList
                        .remove('piano-key-active', 'piano-key-active-pseudo');
                }
            });
        }, 70);
    }
}

// const createEvent = (piano, event, callback) => piano.addEventListener(event, callback);
// event Click Mouseover note
const eventClick = async Event => {
    const target = Event.target;
    target.classList
        .add('piano-key-active', 'piano-key-active-pseudo');
    const src = target.getAttribute('data-src');
    await elem(src);

    setTimeout(() => {
        arr.forEach(el => {
            if (el.classList.contains('piano-key-active')) {
                target.classList
                    .remove('piano-key-active', 'piano-key-active-pseudo');
            }
        });
    }, 70);
}
// event Click Mouseover note
const eventMouseover = async Event => {
    if (Event.buttons) {
        const target = Event.target;
        target.classList
            .add('piano-key-active', 'piano-key-active-pseudo');
        const src = target.getAttribute('data-src');
        await elem(src);

        setTimeout(() => {
            arr.forEach(el => {
                if (el.classList.contains('piano-key-active')) {
                    target.classList
                        .remove('piano-key-active', 'piano-key-active-pseudo');
                }
            });
        }, 70);
    }
};

// click mouseover
const clickPlay = () => {
    document.removeEventListener("keypress", eventKeypress);

    piano.addEventListener('click', eventClick);
    piano.addEventListener('mouseover', eventMouseover);
}

// keypress
const pressPlay = () => {
    document.addEventListener("keypress", eventKeypress);

    piano.removeEventListener('click', eventClick);
    piano.removeEventListener('mouseover', eventMouseover);
}

clickPlay(flag);
const play = flag => flag ? clickPlay() : pressPlay();

// fullscreen
const fs = document.querySelector('.fullscreen');
fs.addEventListener('click', () => {
    !document.fullscreenElement
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen()
});
