import { Reducer } from 'redux'

const prevRouteId: Reducer = (state: number = 1, {type, payload}): number => {
    switch (type) {
        case 'CHANGE_PREV_ROUTE_ID':
            return payload
        default:
            return state
    }
}

export default prevRouteId