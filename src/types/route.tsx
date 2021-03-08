export default interface route {
    id: number,
    path: string,
    component: () => JSX.Element
}