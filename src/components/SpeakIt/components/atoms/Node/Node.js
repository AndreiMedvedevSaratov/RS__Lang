class Node {
    constructor(tag) {
        this.element = document.createElement(tag);
        this.subscriptons = [];
    }

    setInnerText = text => {
        this.element.innerText = text;
    }

    addClass = className => {
        this.element.classList.add(className);
    }

    removeClass = className => {
        this.element.classList.remove(className);
    }

    subscribe = (event, func) => {
        this.subscriptons.push([event, func]);
        this.element.addEventListener(event, func);
    }

    unsubsribe = (event, func) => {
        for (let i = 0; i < this.subscriptons.length - 1; i++) {
            const element = this.subscriptons[i];
            
            if (func === element[1] && event === element[0]) {
                this.element.removeEventListener(event, func);
                this.subscriptons.splice(i, 1);
                i--;
            }
        }
    }

    append = (nodes) => {
        if (Array.isArray(nodes)) {
            this.element.append(...nodes);
        } else {
            this.element.append(nodes);
        }
    }

    clearChilds = () => {
        this.element.innerHTML = '';
    }

}

export default Node;