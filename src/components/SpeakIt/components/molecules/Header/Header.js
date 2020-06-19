import Node from "../../atoms/Node/Node";

import './header.scss';

const blockName = 'header';

class Header extends Node {
    constructor() {
        super('div');
        // this.element & this.subscriptions add all class methods

        this.setInnerText(blockName);
        this.addClass(blockName);
    }
}

export default Header;