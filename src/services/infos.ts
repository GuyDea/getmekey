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
                    <p><b>Just remember:</b> <i>Stop Mr. Attacker cold with secret that’s bold!</i></p>`}]
]);
