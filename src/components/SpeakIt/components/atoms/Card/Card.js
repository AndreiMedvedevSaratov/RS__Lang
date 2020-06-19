import Node from '../Node/Node';

import './card.scss';

const blockName = 'card';
const audioHash = 'https://raw.githubusercontent.com/markflerko/rslang-data/master/data/';

class Card extends Node {
    constructor({
        word,
        image,
        audio,
        audioMeaning,
        audioExample,
        textMeaning,
        textExample,
        transcription,
        translation
    },
        onClick
    ) {
        super('div');
        this.addClass(blockName);
        this.onClick = onClick;
        this.subscribe('click', this.playAudio);

        this.onClick ? this.element.onclick = this.onCardClick : null;

        this.word = word;
        this.image = image;
        this.audio = audio;
        this.audioMeaning = audioMeaning;
        this.audioExample = audioExample;
        this.textMeaning = textMeaning;
        this.textExample = textExample;
        this.transcription = transcription;
        this.translation = translation;

        this.audioFuck = document.createElement('audio');
        this.audioFuck.src = this.audio.replace('files/', audioHash);

        const icon = document.createElement('span');
        icon.classList.add(`${blockName}__icon`)
        icon.innerText = 'X';

        this.info = new Node('div');
        this.info.addClass(`${blockName}__info`)

        const wordNode = document.createElement('p');
        wordNode.classList.add(`${blockName}__info__word`);
        wordNode.innerText = this.word;

        const transcriptionNode = document.createElement('p');
        transcriptionNode.classList.add(`${blockName}__info__transcription`);
        transcriptionNode.innerText = this.transcription;

        const translationNode = document.createElement('p');
        translationNode.classList.add(`${blockName}__info__translation`);
        translationNode.innerText = this.translation;

        this.info.append([wordNode, transcriptionNode, translationNode])

        this.append(this.audioFuck);

        this.append([icon, this.info.element]);
    }

    onCardClick = () => {
        this.onClick(this.image);
    }

    playAudio = () => {
        this.audioFuck.play();
    }

}

export default Card;