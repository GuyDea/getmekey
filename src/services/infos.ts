import {popupService} from "/src/services/popup-service.js"
import {GmkInfoPopupContent} from "/src/components/popup/gmk-info-popup-content.js"
import {getOrigin} from "/src/utils/helper-functions.js";

export type InfoData = {
    header: string;
    content: string;
}

const infoValues: Map<string, InfoData> = new Map([
    ['secret', {header: 'Your Secret Text', content: `
<p>Your one-and-only secret that you have to remember</p>
<p>It is used as a foundation for your generated passwords</p>
<p>Make it as unique and strong as your memory allows you (<a href="${getOrigin()}/why-strong-secret" target="_blank">Why?</a>)</p>
<p><b>Never Share it with anyone!</b></p>`}],
    ['appName', {header: 'App Name', content: `
    <p>
    `}],
])

export class Infos {
    openInfo(data: string){
        popupService.open(infoValues.get(data)!.header, new GmkInfoPopupContent(infoValues.get(data)!.content));
    }
}

export const infos = new Infos();