import {Component} from "./componentTypes";

export class Settings implements Component<void>{
    create(){
        let parentDiv = document.createElement('div');
        parentDiv.innerHTML = 'settings';
        return parentDiv;
    }
}