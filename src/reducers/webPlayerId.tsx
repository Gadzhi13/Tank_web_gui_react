import { Reducer } from 'redux'

const webPlayerId: Reducer = (state: string = '', {type, payload}): string => {
    switch (type) {
        case 'SET_WEB_PLAYER_ID':
            return payload
        default:
            return state
    }
}

export default webPlayerId