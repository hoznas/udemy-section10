
import Component from "./base-component.js"
import * as Validation from "../util/validation.js"
import { autobind as Autobind } from "../decorators/autobind.js"
import { projectState } from "../state/project-state.js"

export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    mandayInputElement: HTMLInputElement

    constructor(){
        super("project-input","app", true,'user-input')

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement
        this.mandayInputElement = this.element.querySelector('#manday')! as HTMLInputElement

        this.configure()
    }   

    configure(){
        this.element.addEventListener('submit',this.submitHandler)
    }
    renderContent(): void {
        
    }
    private gatherUserInput():[string,string,number]|void{
        const title = this.titleInputElement.value
        const description  = this.descriptionInputElement.value
        const manday = this.mandayInputElement.value

        const titleValidatable: Validation.Validatable = {
            value: title,
            required: true
        } 
        const descriptionValidatable: Validation.Validatable = {
            value: description,
            required: true,
            minLength: 5
        } 
        const mandayValidatable: Validation.Validatable = {
            value: +manday,
            required: true,
            min: 1,
            max: 1000
        } 

        if(!Validation.validate(titleValidatable) || 
            !Validation.validate(descriptionValidatable) || 
            !Validation.validate(mandayValidatable)){
            alert("invalid input!")
        }else{
            return [title,description,+manday]
        }
    }

    private clearInput(){
        this.titleInputElement.value = ""
        this.descriptionInputElement.value = ""
        this.mandayInputElement.value = ""
    }

    @Autobind
    private submitHandler(event: Event){
        event.preventDefault()
        const userInput = this.gatherUserInput()
        if (Array.isArray(userInput)){
            const [title,desc,manday] = userInput
            projectState.addProject(title,desc,manday)
            //console.log(title,desc,manday)
            this.clearInput()
        }
    }
}

