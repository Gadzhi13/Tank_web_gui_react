import axios from 'axios'

export const spotifyConnect = (clientId: String, clientPassword: String) => {
    let clientString: string = clientId + ':' + clientPassword
    return axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
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
        method: 'GET',
        headers: {
            'Authorization': authString
        }
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        console.log('err caught - ')
        console.log(err)
        return err
    })
}