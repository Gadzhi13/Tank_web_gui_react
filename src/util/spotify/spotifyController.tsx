import axios from 'axios'

//DEPRECATED: not needed with implicit grant on spotify end
export const spotifyConnect = () => {
    let clientString: string = '3ad740515ff74609bb38bc94cebf18b6'
    return axios({
        method: 'GET',
        url: 'https://accounts.spotify.com/authorize',
        data: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientString).toString('base64')
        }
    })
        .then((res) => {
            return res.data.access_token
        })
        .catch((err) => {
            console.log('err caught - ')
            console.log(err)
            return err
        })
}

export const spotifyGetDevices = (accessToken: String) => {
    let authString: String = 'Bearer ' + accessToken
    return axios({
        url: 'https://api.spotify.com/v1/me/player/devices',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authString
        }
    })
    .then((res) => {
        return res.data.devices
    })
    .catch((err) => {
        console.log('err caught - ')
        console.log(err)
        return
    })
}