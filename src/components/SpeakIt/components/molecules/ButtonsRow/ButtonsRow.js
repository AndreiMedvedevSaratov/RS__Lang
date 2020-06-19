import Node from "../../atoms/Node/Node";

import './buttonsRow.scss';

const blockName = 'buttonsRow';

class ButtonsRow extends Node {
    constructor() {
        super('div');
        // this.element & this.subscriptions add all class methods

        this.setInnerText(blockName);
        this.addClass(blockName);

        this.buttons = [];
    }
}

export default ButtonsRow;