import changePrevRouteIdType from '../types/changePrevRouteId'

export const changePrevRouteId = (id: number): changePrevRouteIdType => {
    return {
        type: 'CHANGE_PREV_ROUTE_ID',
        payload: id
    }
}