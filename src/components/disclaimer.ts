import {SubPage} from "../types.js";

export class Disclaimer implements SubPage{
    getContent(): string {
        return `
<div id="disclaimerContent">
    <div>
        Do not be asshole
    </div>
</div>
`;
    }
}