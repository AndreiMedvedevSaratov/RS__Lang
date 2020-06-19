import Node from '../../atoms/Node/Node';
import CardPannel from '../CardPannel/CardPannel';

import { defaultImageUrl } from '../../../constants';

import './main.scss';


const blockName = 'main';

const getPath = (relativePath) => {
    const path = relativePath.split('/')[1];
    const url = `https://raw.githubusercontent.com/markflerko/rslang-data/master/data/${path}`;
    return url;
}

class Main extends Node {
    constructor() {
        super('div')
        this.addClass(blockName);

        this.image = new Node('img');
        this.image.addClass(`${blockName}__image`);
        this.image.element.src = defaultImageUrl;

        this.cardPannel = new CardPannel(this.onCardClick);

        this.append([this.image.element, this.cardPannel.element]);
    }

    updateCards = (data) => {
        this.cardPannel.updateCards(data);
    }

    updateImage = (relativePath) => {
        this.image.element.src = getPath(relativePath);
    }

    onCardClick = (data) => {
        this.updateImage(data);
        // other logic
    }
}

export default Main