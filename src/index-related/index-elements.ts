const elById = <T extends HTMLElement>(id: string) => () => document.getElementById(id)! as T;
/**
 * Provides access to all elements available on the main page
 */
export class IndexElements {
    public static mainPage = elById('mainPage');
    public static arrow1 = elById('arrow1');
    public static arrow2 = elById('arrow2');
    public static arrow3 = elById('arrow3');
    public static secretInput = elById<HTMLInputElement>('secretInput');
    public static subPageContainer = elById('subPageContainer');
    public static passReqLength = elById('passReqLength');
    public static passReqNumber = elById('passReqNumber');
    public static passReqUppercase = elById('passReqUppercase');
    public static passReqSpecial = elById('passReqSpecial');
    public static saltInput = elById<HTMLInputElement>('saltInput');
    public static saltReqNumber = elById('saltReqNumber');
    public static saltReqUppercase = elById('saltReqUppercase');
    public static saltReqSpecial = elById('saltReqSpecial');
    public static finalPassword = elById<HTMLInputElement>('finalPassword');
    public static finalPasswordLabel = elById<HTMLLabelElement>('finalPasswordLabel');
    public static secretHideToggle = elById('secretHideToggle');
    public static saltHideToggle = elById('saltHideToggle');
    public static passwordHideToggle = elById('passwordHideToggle');
    public static copyButton = elById('copyButton');
    public static copySaveButton = elById('copySaveButton');
    public static dotLoader = elById('dotLoader');
    public static iconInfoPath = elById('icon-info-path');
    public static dotsLoading = elById('dots-loading');
    public static algoTypeNote = elById('algoTypeNote');
    public static firstCharactersNote = elById('firstCharactersNote');
    public static securityTextNote = elById('securityTextNote');
    public static securityTextPositionNote = elById('securityTextPositionNote');
}
