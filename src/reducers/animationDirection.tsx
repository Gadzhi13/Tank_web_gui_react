import { Action, Reducer } from 'redux'

const animationDirection: Reducer = (state: string = 'navfadeleft', action: Action): string => {
    switch (action.type) {
        case 'LEFT':
            return 'navfadeleft'
        case 'RIGHT':
            return 'navfaderight'
        default:
            return state
    }
}

export default animationDirection