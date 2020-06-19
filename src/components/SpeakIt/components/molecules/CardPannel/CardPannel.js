import Node from "../../atoms/Node/Node";
import Card from "../../atoms/Card/Card";

import "./card-pannel.scss";

const blockname = 'card-pannel';

class CardPannel extends Node {
    constructor(onCLick) {
        super('div');
        this.addClass(blockname);

        this.cards = [];
        this.onCLick = onCLick;
    }

    updateCards = (data) => {
        this.cards = data;

        const fragment = document.createDocumentFragment();
        
        data.forEach(config => {
            const card = new Card(config, this.onCLick);
            fragment.append(card.element);
        });
        console.log(fragment);

        this.clearChilds();
        this.append(fragment);
    }
}

export default CardPannel;