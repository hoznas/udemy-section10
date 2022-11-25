export default class Component {
    constructor(tenplateID, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(tenplateID);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        let insertPosition = insertAtBeginning ? 'afterbegin' : 'beforeend';
        this.hostElement.insertAdjacentElement(insertPosition, this.element);
    }
}
//# sourceMappingURL=base-component.js.map