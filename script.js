const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const keyArray = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');

// play Audio
const elem = async (src) => {
    const audio = new Audio();
    if (src) {
        audio.src = src;

        await audio.play();
    }
}

// switch active mode
const clickEvt = flag => {
    play(flag);

    const notesClassList = btnNotes.classList;
    const lettersClassList = btnLetters.classList;

    flag ? notesClassList.add('btn-active') : notesClassList.remove('btn-active');
    flag ? lettersClassList.remove('btn-active') : lettersClassList.add('btn-active');

    for (const {classList} of keyArray) {
        flag ? classList.remove('piano-key-letter') : classList.add('piano-key-letter');
    }
}

// btn switch notes mode
btnNotes.addEventListener('click', () => clickEvt(true));

// btn switch letters mode
btnLetters.addEventListener('click', () => clickEvt(false));

// event Keypress note
const eventKeypress = async Event => {
    const keyPick = [...document.querySelectorAll('.piano-key')]
        .find(el => 'Key' + el.getAttribute('data-letter') === Event.code);

    if (Event.repeat) { return }

    if (keyPick !== undefined) {
        const src = keyPick?.getAttribute('data-src');

        keyPick?.classList.add('piano-key-active', 'piano-key-active-pseudo');

        await elem(src);

        setTimeout(() => {
            keyArray.forEach(element => {
                if (element.classList.contains('piano-key-active')) {
                    keyPick.classList
                        .remove('piano-key-active', 'piano-key-active-pseudo');

                }
            });
        }, 70);
    }
}

// event Click Mouseover note
const eventClick = async Event => {
    const target = Event.target;
    target.classList
        .add('piano-key-active', 'piano-key-active-pseudo');

    const src = target.getAttribute('data-src');

    await elem(src);

    setTimeout(() => {
        keyArray.forEach(el => {
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
            keyArray.forEach(el => {
                if (el.classList.contains('piano-key-active')) {
                    target.classList
                        .remove('piano-key-active', 'piano-key-active-pseudo');
                }
            });
        }, 70);
    }
};

// active event
const evtPlay = flag => {
    const pianoAddEventListener = piano.addEventListener;
    const pianoRemoveEventListener = piano.removeEventListener;

    flag ? document.removeEventListener("keydown", eventKeypress)
        : document.addEventListener("keydown", eventKeypress);

    flag ? pianoAddEventListener('click', eventClick)
        : pianoRemoveEventListener('click', eventClick);

    flag ? pianoAddEventListener('mouseover', eventMouseover)
        : pianoRemoveEventListener('mouseover', eventMouseover);
}

evtPlay(true);

const play = flag => evtPlay(flag);

// fullscreen
const fullScreen = document.querySelector('.fullscreen');

fullScreen.addEventListener('click', () => {
    !document.fullscreenElement
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen()
});
