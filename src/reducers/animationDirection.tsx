import { Action, Reducer } from 'redux'

const animationDirection: Reducer = (state: string = 'left', action: Action): string => {
    switch (action.type) {
        case 'LEFT':
            return 'left'
        case 'RIGHT':
            return 'right'
        default:
            return state
    }
}

export default animationDirection