

export default abstract class Component<T extends HTMLElement,U extends HTMLElement> {  
    templateElement : HTMLTemplateElement
    hostElement : T
    element: U

    constructor(tenplateID: string, hostElementId: string, insertAtStart:boolean, newElementId?: string){

        this.templateElement = document.getElementById(tenplateID)! as HTMLTemplateElement
        this.hostElement = document.getElementById(hostElementId)! as T
        const importedNode = document.importNode(this.templateElement.content,true)
        this.element = importedNode.firstElementChild as U
        if (newElementId){
            this.element.id = newElementId
        }
        this.attach(insertAtStart)
    }

    private attach(insertAtBeginning: boolean){
        let insertPosition:InsertPosition = insertAtBeginning ? 'afterbegin' : 'beforeend'
        this.hostElement.insertAdjacentElement(insertPosition, this.element)
    }
    abstract configure(): void
    abstract renderContent(): void
}
