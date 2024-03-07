const elById = <T extends HTMLElement>(id: string) => () => document.getElementById(id)! as T;
/**
 * Provides access to all elements available on the page
 */
export class Elements {
    public static siteInput = elById('siteInput');
    public static secretInput = elById<HTMLInputElement>('secretInput');
    public static disclaimerContent = elById('disclaimerContent');
    public static subPageContainer = elById('subPageContainer');
    public static passReqLength = elById('passReqLength');
    public static passReqNumber = elById('passReqNumber');
    public static passReqUppercase = elById('passReqUppercase');
    public static passReqSpecial = elById('passReqSpecial');
    public static prefixInput = elById<HTMLInputElement>('prefixInput');
    public static arrow1 = elById('arrow1');
    public static arrow2 = elById('arrow2');
    public static arrow3 = elById('arrow3');
    public static prefixReqNumber = elById('prefixReqNumber');
    public static prefixReqUppercase = elById('prefixReqUppercase');
    public static prefixReqSpecial = elById('prefixReqSpecial');
    public static finalPassword = elById<HTMLInputElement>('finalPassword');
    public static finalPasswordLabel = elById<HTMLLabelElement>('finalPasswordLabel');
    public static secretHideToggle = elById('secretHideToggle');
    public static prefixHideToggle = elById('prefixHideToggle');
    public static passwordHideToggle = elById('passwordHideToggle');
    public static copyButton = elById('copyButton');
    public static copySaveButton = elById('copySaveButton');
    public static prefixPinToggle = elById('prefixPinToggle');
}
