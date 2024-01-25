const elById = (id: string) => document.getElementById(id)!;
export class Elements {
    public static siteInput = () => elById('siteInput');
    public static passwordInput = () => elById('passwordInput');
    public static disclaimerContent = () => elById('disclaimerContent')!;
    public static subPageContainer = () => elById('subPageContainer')!;
}
