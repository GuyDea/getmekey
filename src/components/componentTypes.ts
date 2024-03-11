export interface Component<T>{
    create(props?: T): HTMLElement;
}