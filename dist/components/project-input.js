var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "./base-component.js";
import * as Validation from "../util/validation.js";
import { autobind as Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.mandayInputElement = this.element.querySelector('#manday');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
    }
    gatherUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const manday = this.mandayInputElement.value;
        const titleValidatable = {
            value: title,
            required: true
        };
        const descriptionValidatable = {
            value: description,
            required: true,
            minLength: 5
        };
        const mandayValidatable = {
            value: +manday,
            required: true,
            min: 1,
            max: 1000
        };
        if (!Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(mandayValidatable)) {
            alert("invalid input!");
        }
        else {
            return [title, description, +manday];
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.mandayInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            projectState.addProject(title, desc, manday);
            this.clearInput();
        }
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map