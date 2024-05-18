import {gmkWindow} from "/src/index-related/index-renderer.js";

export type InfoData = {
    header: string;
    content: string;
}

export const infoValues: Map<string, InfoData> = new Map([
    ['info-secret', {header: 'Your Secret Text', content: `
<p>Your one-and-only secret that you have to remember</p>
<p>It is used as a foundation for your generated passwords</p>
<p>Make it as unique and strong as your memory allows you (<a href="/why-strong-secret">Why?</a>)</p>
<p><b>NEVER SHARE IT WITH ANYONE!</b></p>`}],
    ['appName', {header: 'App Name', content: `
    <p>
    `}],
    ['why-strong-secret', {header: 'Why Do I Need Strong Secret?', content: `
    <p>Are you wondering <i>"Why do I have to have strong secret, when generated password is super-strong anyway?"</i></p>
                    <p>Good question! And the answer is simple - it significantly reduces possible brute-force attack</p>
                    <p>Imagine someone (let's call him Mr. Attacker), who wants to hack your accounts. Mr. Attacker was able to acquire one
                        of your generated passwords via <a href="https://en.wikipedia.org/wiki/Phishing" target="_blank">phishing site</a>. 
                        and thanks to <a href="https://en.wikipedia.org/wiki/Social_engineering_(security)" target="_blank">social engineering</a>,
                        he was able to figure out, what algorithm you use to transform secret into password.
                    </p>
                    <p>Now with full knowledge of how you generate your passwords, Mr. Attacker can use trial-error method to find the matching secret.</p>
                    <p>Let's do some napkin math with ballpark numbers</p>
                    <p>Also let's assume, that Mr. Attacker has access to a supercomputer, which can test 1 000 000 000 000 hash generations per second</p>
                    <p>If your password was weak, it would be cracked in seconds</p>
                    <p>However, if your secret is long, unique, unpredictable with all kinds of symbols incorporated,
                    this would represent ~1 000 000 000 000 000 000 000 000 000 000 000 000 possibilities</p>
                    <p>In short, it would take Mr. Attacker and his supercomputer trillions upon trillions of years to find the match</p>
                    <p><b>Just remember:</b> <i>Stop Mr. Attacker cold with secret that’s bold!</i></p>`}],
    ['disclaimer', {header: 'Disclaimer', content: `    
    <p>GetMeKey is designed to help you generate secure passwords using cryptographic methods.</p>
    <p>While we have taken all necessary measures to ensure the security and reliability of our service, we cannot guarantee absolute security.</p> 
    <p>Users are responsible for safeguarding their secret phrases and understanding the limitations of the service.</p>
    <p>GetMeKey and all its creators and contributors are not liable for any misuse, or damage caused by using this service.</p>
    <p><b>Any use of GetMeKey service is at own risk.</b></p>
    `}],
    ['about', {header: 'About GetMeKey', content: `
    <h2>How GetMeKey Works</h2>
    <p>GetMeKey is tool, that allows you to have safe and unique passwords for all your applications, only by provideing it with your
    secret text and name of the desired application. This is achieved by putting these two pieces of information togather and running it through
    cryptographic hash function. </p>
    <p><a href="https://en.wikipedia.org/wiki/Hash_function" target="_blank">Hash function</a> is, simply put, process,
    that takes some information as an input and outputs different information that looks totally random. However, for same input you always get the
    same output. Also, besides trial-and-error approach, there is no way how someone could deduce original input, only by seeing the output.</p>
    <p>Using this approach you can quickly generate unique passwords on demand, on any device, even when offline. And if some compromised app leaks
    your password, it doesn't impact any other account that you have.</p>
    <h2>Story Of GetMeKey</h2>
    <p><i>GetMeKey</i> is successor of a personal tool, that I created for my own needs.</p>
    <p>After years of trying to find the best way how to manage hundrets of passwords and testing dozens of solutions along the way, 
    I came up with and idea, that ticked all the boxes. Idea that would be based on mixing single secret text with app name and hashing algorithm.</p>
    <p>This idea:</p>        
    <ul>
      <li>Creates unbreakable passwords</li>  
      <li>Relies on remembering as few datapoints as possible</li>      
      <li>Desn't depend on any specific service</li>      
      <li>Could not be hacked or stealed</li>
      <li>Could quickly provide needed password anywhere, on any device, even when offline</li>
      <li>Would use only well-known algorighms</li>
    </ul>
    <p>Unfortunatelly, no service or implementation of this idea existed.</p>
    <p>Luckly, being an IT engineer, who developed secured, mission-critical systems for multiple international companies for more than a decade,
     gave me more than enough experience, to put first version togather in few hours.</p>
    <p>This demo app, with very original working title <i>"PasswordGenerator"</i> was very simple and ugly looking - yet worked perfectly!</p>
    <p>As years went by, and I was adding more bells and whistles to it, I started to notice that password management is still open topic,
    even though many other applications exist already.</p>
    <p>Many people I talked to, found same flaws with these applications, as I did.</p>
    <p>That's when I decided to make <i>PasswordGenerator</i> open to everyone - <i>GetMeKey</i> was born.</p>
    <h2>Afterword</h2>
    <p>I certainly hope you will find GetMeKey useful. If so, please let me know - any feedback, good or bad, is always appreciated!</p>
    <p>Have fun and - <b>be safe!</b></p>
                       
    <h2>Version</h2>                       
    <p class="appVersion">
        <div><strong>Version</strong> ${gmkWindow.buildInfo.version}.${gmkWindow.buildInfo.vcHash}</div>
        <div><strong>Build at</strong> ${gmkWindow.buildInfo.buildAt}</div>
    </p>`}]

]);
