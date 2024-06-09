import {gmkWindow} from "/src/index-related/index-renderer.js";

export type InfoData = {
    header: string;
    content: string;
}

export const infoValues: Map<string, InfoData> = new Map([
    ['info-secret', {header: 'Your Secret Text', content: `
<p>Your one-and-only secret that you have to remember.</p>
<p>It is used as a foundation for your generated passwords.</p>
<p>Make it as unique and strong as your memory allows you. Wondering <a href="/why-strong-secret">why?</a></p>
<p><b>NEVER SHARE IT WITH ANYONE!</b></p>`}],
    ['why-strong-secret', {header: 'Why Do I Need Strong Secret?', content: `
    <p>Are you wondering <i>"Why do I have to have strong secret, when generated password is super-strong anyway?"</i></p>
                    <p>Good question! And the answer is simple - it significantly reduces effectiveness of possible brute-force attacks.</p>
                    <p>Imagine someone, let's call him Mr. Attacker, who wants to hack your accounts. Mr. Attackers goal is to find your secret.</p>
                    <p>Mr. Attacker was able to acquire one
                        of your generated passwords via <a href="https://wikipedia.org/wiki/Phishing" target="_blank">phishing site</a>. 
                        and thanks to <a href="https://wikipedia.org/wiki/Social_engineering_(security)" target="_blank">social engineering</a>,
                        he was able to figure out, that you use hash function to generate passwords based on your secret.
                    </p>
                    <p>Now, with one of your passwords Mr. Attacker can start generating random texts, over which he will apply your hash function, with hopes,
                    that one of these texts will match the stolen password. Thus finding out the original secret at random - just by using many trial-and-error runs.</p>
                    <p>Let's do some napkin math.</p>
                    <p>We assume, that Mr. Attacker has access to a supercomputer, which can test 1 000 000 000 000 hash generations per second</p>
                    <p>If your secret is weak, with this many trial-and-errors, it would be cracked in seconds.</p>
                    <p>However, if your secret is long, unique, unpredictable with all kinds of symbols,
                    this would represent ~1 000 000 000 000 000 000 000 000 000 000 000 000 possibilities, he would need to test against.</p>
                    <p>Put otherwise, it would take Mr. Attacker and his supercomputer trillions upon trillions of years to find the match.</p>
                    <p><b>So just remember:</b> <i>Stop Mr. Attacker cold with secret that’s bold!</i></p>`}],
    ['disclaimer', {header: 'Disclaimer', content: `    
    <p>GetMeKey is designed to help you generate secure passwords using cryptographic methods.</p>
    <p>While we have taken all necessary measures to ensure the security and reliability of our service, we cannot guarantee absolute security.</p> 
    <p>Users are responsible for safeguarding their secret phrases and understanding the limitations of the service.</p>
    <p>GetMeKey and all its creators and contributors are not liable for any misuse, or damage caused by using this service.</p>
    <p><b>Any use of GetMeKey service is at own risk.</b></p>
    `}],
    ['about', {header: 'About GetMeKey', content: `
    <h2>How GetMeKey Works</h2>
    <p>GetMeKey is tool, that allows you to have safe and unique passwords for all your applications, only by providing it with your
    secret text and name of the desired application. This is achieved by putting these two pieces of information togather and running it through
    cryptographic <a href="/what-is-hash">hash function</a>. All steps are described in-depth <a href="/generation-steps">here</a>.</p>   
    <p>Using this approach you can quickly recreate your passwords on demand, on any device, even when offline. And if some compromised app leaks
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
    </ul>
    <p>Unfortunatelly, no service or implementation of this idea existed.</p>
    <p>Luckly, being an IT engineer, who developed secured, mission-critical systems for multiple international companies for more than a decade,
     gave me more than enough experience, to put first version togather in few hours.</p>
    <p>This demo app, with very original working title <i>"PasswordGenerator"</i> was very simple and ugly looking - yet worked perfectly!</p>
    <p>As years went by, and I was adding more bells and whistles to it, I started to notice that password management is still open topic,
    even though many other applications exist already.</p>
    <p>Many people I talked to, found same flaws with these applications, as I did.</p>
    <p>That's when I decided to make <i>PasswordGenerator</i> open to everyone. After some tweeks and updates <i>GetMeKey</i> was born.</p>
    <h2>Afterword</h2>
    <p>I certainly hope you will find GetMeKey useful. If so, please let me know - any feedback, good or bad, is always appreciated!</p>
    <p>Have fun and - <b>be safe!</b></p>
                       
    <h2>Version</h2>                       
    <p class="appVersion">
        <div><strong>Build</strong> ${gmkWindow.buildInfo.version}.${gmkWindow.buildInfo.vcHash}</div>
        <div><strong>At</strong> ${gmkWindow.buildInfo.buildAt}</div>
    </p>`}],
    ['info-user-interface', {header: 'User Interface Options', content: `
    <h2>Top-Secret Mode</h2>
    <p>This mode hides any visual clues, that might reveal hints how you generate passwords.</p>
    <p>Useful for anyone, who might have display visible to other people - streamers, open-office, desktop tracking tools, etc.</p>
    <h2>Hide Info Button</h2>
    <p>Hides Info button for cleaner visual experience</p>
    `}],
    ['info-usability', {header: 'Usability Options', content: `
    <h2>Auto Copy</h2>
    <p>Automatically copies generated password to clipboard</p>
    <h2>App Name Prefill</h2>
    <p>When GetMeKey is open, it will try to prefill <strong>App Name</strong> based on the current</p>
    <ul>
        <li>URL (only for Browser extension)</li>
        <li>Clipboard content</li>
    </ul>
    `}],
    ['info-recall', {header: 'Secret Recall Options', content: `
    <h2>Enable Secret Recall</h2>
    <p>Shows option to store current valid secret as <strong>Recalled</strong></p>
    <p>Marking secret as recalled has several benefits:</p>
    <ul>
        <li>Next time you enter your secret, you see that this secret has been entered before, letting you know you didn't do any typo</li>
        <li>Your <a href="/hash-settings">Hash Settings</a> are encrypted and stored together with secret hash, so you don't have to specify them every time</li>
        <li>Enables to use <strong>Remember Recalled Secret</strong> option</li>
    </ul>
    <p>When secret is marked as <strong>Recalled</strong>, it is not the secret that's stored on the device, but its hashed value.</p>
    <p>This means, even if someone with full access to your device and knowledge of GetMeKey, could not reveal your secret.</p>
    <h3>How It Works</h3>
    <p>Every time you type something into the <strong>Secret</strong> field, GetMeKey calculates its hash value and compares it with all hash values of previous secrets marked as <strong>Recalled</strong>.
    If there is match of hashes, GetMeKey knows it has been marked as <strong>Recalled</strong> before.</p>
    <p>Then it can decrypt <a href="/hash-settings">Hash Settings</a>, that were stored together with hashed secret, in encrypted form, using the secret as a key.</p>
    <h2>Remember Recalled Secret</h2>
    <p>If you leave GetMeKey, while recalled secret is active, this secret will be remembered and prefilled next time you open GetMeKey.</p>
    <p>As security measure, an attempt to reveal the secret after the reload, will cause secret to be discarded.</p>    
    <p><strong style="color: var(--color-danger)">Caution: </strong>During remembering period, secret itself is stored in encrypted format on the device. 
    Someone with full access to your device and knowledge of GetMeKey could decrypt and reveal it!</p>    
    `}],
    ['info-app-name', {header: 'App Name', content: `
    <p><a>This text is used as a value, that shuffles your secret, when using <a href="/what-is-hash">hash function</a>. It's also known as <a href="https://wikipedia.org/wiki/Salt_(cryptography)" target="_blank">"salt"</a> in cryptography.</p>
    <p>Using this value, you can generate new passwords specific to given application.</p>
    <p>To prevent typos and app-naming-conundrums, only lowercase letters and " - " are allowed, as any minor modification of this value would result in totally different password. E.g. "netflix" and "Netflix" would be seen as different applications.</p>
    <p>We recommend to use the main domain name as an app name.</p>
    <p>E.g. https://mail.<strong>google</strong>.com can be used as "<strong>google</strong>".</p>    
    <p>GetMeKey <a href="/info-usability">App Name Prefill</a> functionality also uses this approach.</p>    
    `}],
    ['what-is-hash', {header: 'What Is Hashing?', content: `
    <p>Hash function is simple in its principle.</p>
    <p>It transforms given input into output that:</p>
    <ul>
        <li>Always returns</li>
        <ul>
            <li>same value for same input</li>
            <li>different value for different input</li>
        </ul>        
        <li>Could not be traced back to original input</li>        
    </ul>    
    <p>This idea is very powerful and used widely in cryptography. Your device is using it every time you connect to internet, download files,
    write private messages to friends etc.</p>   
    <p>You can read more about hash functions <a href="https://wikipedia.org/wiki/Hash_function" target="_blank">here</a></p> 
    `}],
    ['info-password', {header: 'Generated Password', content: `
    <p>Result of putting your secret together with app name and running it through <a href="/what-is-hash">hash function.</a></p> 
    <p>To be usable as a password, result is shortened and prefixed with <strong>Security Prefix</strong> as defined in <a href="/hash-settings">Hash Settings</a>.</p>
    `}],
    ['info-hash-selection', {header: 'Hash Algorithm', content: `
        <p>You can select, which hash function to use for password generation. Each function has respective properties,
        that can configure it further.</p>
        <h2><a href="https://wikipedia.org/wiki/PBKDF2" target="_blank">PBKDF2</a></h2>
        <p>PBKDF2 (Password-Based Key Derivation Function 2) enhances security by using a salt to prevent rainbow table 
        attacks and applying a pseudorandom function like HMAC (using SHA in the process) multiple times to the password and salt to increase 
        computational effort, thwarting brute-force attacks.</p>
        <p>This algorithm is selected as default for GetMeKey, due to its iterative properties and being implemented directly in the browser.</p>
        <p>Number of iterations is adjustable and defaults to 1 000 000 - offering the best ratio of security and speed.</p>        
        <h2><a href="https://wikipedia.org/wiki/Secure_Hash_Algorithms" target="_blank">SHA</a></h2>
        <p>SHA (Secure Hash Algorithm) is a family of cryptographic hash functions designed to provide a fixed-size 
        hash value from variable-length input data, ensuring data integrity. SHA is fast and efficient, which also 
        makes it more prone to be cracked with brute-force attack.</p>
        <p>SHA doesn't provide in-built salting mechanism. GetMeKey can achieve this effect, by (pre/su)fixing the secret
        with <string>App Name</string> value.</p>
        <h2><a href="https://wikipedia.org/wiki/Scrypt" target="_blank">Scrypt</a></h2>
        <p>Scrypt is a password-based key derivation function designed to make it costly both in terms of time and 
        memory to perform large-scale custom hardware attacks. It achieves this by using a large amount of memory 
        compared to other key derivation functions like PBKDF2. It allows for the tuning of memory usage, 
        processing time, and parallelism to adapt to different security requirements.</p>        
    `}],
    ['info-password-format', {header: 'Password Format', content: `
    <h2>Password Text Encoding</h2>
    <p>Used hash functions are binary based, which means that the hashing is done by first transforming the text to its binary form and
    then applying binary transformations.</p>
    <p>The result is also binary - just long list of pseudo-randomly ordered 1s and 0s.</p>
    <p>To transform this into the text password, we can use <a href="https://wikipedia.org/wiki/Base62" target="_blank">Base62</a> encoding algorithm.
    Base 62 generates text using only letters and numbers and no special characters.</p>
    <h2>Take First Characters</h2>
    <p>Resulting text can be very long - not really suitable for password yet. So GetMeKey takes only first X characters.
    20 by default, but can be adjusted.</p>
    <h2>Security Prefix</h2>
    <p>Lastly, this password doesn't contain any special character and could be generated, by chance, without any uppercase, lowercase or number characters.</p>
    <p>It's common password requirement to have these conditions met. Therefore, GetMeKey prefixes the password with constant text - " <i>Ab1!</i> " by default.</p>
    `}],
    ['generation-steps', {header: 'Password Step-By-Step', content: `
        <p>These are steps taken by GetMeKey to generate password from your <i>Secret</i>, <i>App Name</i> and 
        <i><a href="/hash-settings">Hash Settings</a></i></p>
        <ol>
            <li>Both <i>Secret</i> and <i>App Name</i> are transformed to binary representation as UTF-8 characters.</li>
            <li>Hash function takes this as an input and using selected parameters runs hashing algorithm.</li>
            <li>Result is binary array that is then transformed to text using Base62 encoding algorithm.</li>
            <li>This text is shortened to first X number of characters (20 by default).</li>
            <li>Finally, fixed text (" Ab1! " as default) is prefixed to the result, to match general expected criteria of passwords.</li>            
        </ol>
    `}],
    ['generate-outside', {header: 'Generate Password Without GetMeKey', content: `
    
    `}],
    ['policy', {header: 'GetMeKey Policy', content: `
    <h1>Privacy Policy</h1>
    <p>Effective Date: May 23rd 2024</p>
    <h2>Introduction</h2>
    <p>Welcome to GetMeKey! Your privacy is critically important to us. This Privacy Policy explains how we collect, 
    use, and protect your information when you use our password management service. By using GetMeKey, 
    you confirm your agreement with this policy.</p>    
    <h2>Information We Collect</h2>
    <p>GetMeKey does not collect, store, or transmit any personal or non-personal information. 
    All password generation processes occur locally on your device.</p>
    <h2>Data Usage</h2>
    <h3>Secret Phrase</h3>
    <p>Your secret phrase is used locally to generate passwords. It is never transmitted by GetMeKey.
    Optionally, you can decide to use a <a href="/info-recall">Recall or Remember functionalities</a>.</p> 
    <p><b>Recall:</b> let GetMeKey store hashed format of your secret together with encrypted hash settings on your device.</p>
    <p><b>Remember:</b> let GetMeKey store encrypted secret on your device, that could however be fully decrypted with full access to your device.</p>
    <h3>App Name</h3>
    <p>The application names you input are used in combination with your secret phrase to generate passwords. This data is also processed locally and never leaves your device.</p>
    <h3>Generated Passwords</h3>
    <p>The passwords generated by GetMeKey are created on your device on demand and are not transmitted or stored by us.</p>   
    <h2>Security</h2>
    <p>We prioritize your security and have implemented measures to ensure that your data remains private and secure:</p>
    <ul>
        <li><b>Local Processing:</b> All data processing, including password generation, is performed locally on your device.</li>
        <li><b>No Data Transmission:</b> GetMeKey does not transmit any data outside the application.</li>
        <li><b>Transparency:</b> Our source code is served as clearly formatted Javascript files and can be reviewed directly on the device using
         DevTools to ensure transparency and security.</li>
    </ul>
    <h2>User Responsibilities</h2>
    <p>While GetMeKey provides tools to help you generate secure passwords, it is your responsibility to:</p>
    <ul>
        <li><b>Keep Your Secret Phrase Confidential:</b> Never share your secret phrase with anyone.</li>
        <li><b>Use Strong, Unique Secrets:</b> Ensure that your secret phrase is strong and unique to reduce the risk of brute-force attacks.</li>
    </ul>
    <h2>Changes to This Privacy Policy</h2>
    <p>We may update our Privacy Policy from time to time. We will notify you of any changes 
    by posting the new Privacy Policy on <a href="https://x.com/getmekeyapp" target="_blank">X Platform</a>. 
    You are agree to review this Privacy Policy periodically for any changes.</p>
    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
    <p><b>Email:</b> <a href="mailto:info@getmekey.com" target="_blank">info@getmekey.com</a></p>
    <p><b>X:</b> <a href="https://x.com/getmekeyapp" target="_blank">x.com/getmekeyapp</a></p>
`}]
]);
