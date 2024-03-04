const elById = <T extends HTMLElement>(id: string) => () => document.getElementById(id)! as T;
export class Elements {
    public static siteInput = elById('siteInput');
    public static passwordInput = elById<HTMLInputElement>('passwordInput');
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

}
