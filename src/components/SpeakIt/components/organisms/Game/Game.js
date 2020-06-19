import Main from "../../molecules/Main/Main";
import Node from "../../atoms/Node/Node";
import Header from "../../molecules/Header/Header";
import ButtonsRow from "../../molecules/ButtonsRow/ButtonsRow";

import './game.scss';

const blockName = 'game';

class Game extends Node {
    constructor(getWordsData) {
        super('div');
        this.addClass(blockName);

        this.getWordsData = getWordsData;
        this.words = [];

        this.updateCards();

        this.header = new Header();
        this.main = new Main();
        this.buttonsRow = new ButtonsRow();

        this.append([
            this.header.element,
            this.main.element,
            this.buttonsRow.element
        ]);
    }

    getWordsApi = (page = 0, group = 0) =>
        this.getWordsData(page, group)
            .then((res) => {

                this.words = res;
                console.log(this.words);
                return res;
            });

    updateCards = () => {
        this.getWordsApi()
            .then((res) => {
                this.main.updateCards(res);
            })
    }
}

export default Game;