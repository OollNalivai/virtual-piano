const piano = document.querySelector('.piano');
const keyArray = document.querySelectorAll('.piano-key');

// fullscreen
const fullScreen = document.querySelector('.fullscreen');

fullScreen.addEventListener('click', () => {
    !document.fullscreenElement
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen()
});

// make sound
const playAudio = async (src) => {
    const audio = new Audio();

    if (src) {
        audio.src = src;

        await audio.play();
    }
}

// event Keypress note
const eventKeypress = async ({repeat, code}) => {
    const keyPick = [...keyArray].find(el => `Key${el.getAttribute('data-letter')}` === code);

    if (repeat) { return }

    if (keyPick !== undefined) {
        const audioSrc = keyPick.getAttribute('data-src');

        keyPick.classList.add('piano-key-active', 'piano-key-active-pseudo');
        
        await playAudio(audioSrc);

        setTimeout(() => {
            keyArray.forEach(element => {
                if (element.classList.contains('piano-key-active')) {
                    keyPick.classList
                        .remove('piano-key-active', 'piano-key-active-pseudo');

                }
            });
        }, 100);
    }
}

// event Click Mouseover note
const timeout = (keyArray, target) => {
    setTimeout(() => {
        keyArray.forEach(el => {
            if (el.classList.contains('piano-key-active')) {
                target.classList
                    .remove('piano-key-active', 'piano-key-active-pseudo');
            }
        });
    }, 100);
};

const eventClick = async ({target}) => {
    target.classList.add('piano-key-active', 'piano-key-active-pseudo');

    const audioSrc = target.getAttribute('data-src');

    await playAudio(audioSrc);

    timeout(keyArray, target);
}

// event Click Mouseover note
const eventMouseover = async ({target, buttons}) => {
    if (buttons) {
        target.classList.add('piano-key-active', 'piano-key-active-pseudo');

        const audioSrc = target.getAttribute('data-src');

        await playAudio(audioSrc);

        timeout(keyArray, target);
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

// switch active mode
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

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

const play = flag => evtPlay(flag);
