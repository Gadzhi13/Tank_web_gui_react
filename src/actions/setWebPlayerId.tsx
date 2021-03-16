import setWebPlayerIdType from '../types/setWebPlayerId'

export const setWebPlayerId = (webPlayerId: string): setWebPlayerIdType => {
    return {
        type: 'SET_WEB_PLAYER_ID',
        payload: webPlayerId
    }
}