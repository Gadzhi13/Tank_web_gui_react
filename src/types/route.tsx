export default interface route {
    id: number,
    path: string,
    Component: () => JSX.Element
}