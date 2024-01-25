import {Elements} from './elements.js';

export class Listeners{
    public static initialize(){
        Elements.passwordInput().addEventListener('input', ev => {
            console.log('xxx', ev)
        })
    }

}