/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App{
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

            const titleValidatable: Validatable = {
                value: title,
                required: true
            } 
            const descriptionValidatable: Validatable = {
                value: description,
                required: true,
                minLength: 5
            } 
            const mandayValidatable: Validatable = {
                value: +manday,
                required: true,
                min: 1,
                max: 1000
            } 

            if(!validate(titleValidatable) || 
                !validate(descriptionValidatable) || 
                !validate(mandayValidatable)){
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

        @autobind
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

}