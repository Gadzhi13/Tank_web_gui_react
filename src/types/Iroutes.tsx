export default interface Iroutes {
    [index: number]: {
        id: number,
        path: string,
        component: () => JSX.Element
    }
}