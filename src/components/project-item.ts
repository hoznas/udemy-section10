/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />


namespace App{

    export class ProjectItem   extends Component<HTMLLinkElement, HTMLLIElement>
                        implements Draggable{
    
        private project: Project
        constructor(hostId: string, project: Project){
            super('single-project', hostId, false, project.id)
            this.project = project
            this.configure()
            this.renderContent()
        }
        get manday(){
            if(this.project.manday < 20){
                return this.project.manday.toString() + " man/day"
            }else{
                return (this.project.manday / 20).toString() + " man/month"
            }
        }
        @autobind
        dragStartHandler(event: DragEvent): void{
            event.dataTransfer!.setData('text/plain',this.project.id)
            event.dataTransfer!.effectAllowed = 'move'
        }
        @autobind
        dragEndHandler(_: DragEvent): void{
            console.log("drag end")
        }

        configure(): void{
            this.element.addEventListener('dragstart',this.dragStartHandler)
            this.element.addEventListener('dragend',this.dragEndHandler)
        }
        renderContent(): void {
            this.element.querySelector("h2")!.textContent = this.project.title
            this.element.querySelector("h3")!.textContent = this.manday
            this.element.querySelector("p")!.textContent = this.project.description
        }
    }

}
