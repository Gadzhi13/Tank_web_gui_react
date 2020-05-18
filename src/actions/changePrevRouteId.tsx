import changePrevRouteIdType from '../types/changePrevRouteIdType'

export const changePrevRouteId = (id: number): changePrevRouteIdType => {
    return {
        type: 'CHANGE_PREV_ROUTE_ID',
        payload: id
    }
}