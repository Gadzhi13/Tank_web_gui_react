import axios from 'axios'

export const useSpotifyConnect = (clientId: String, clientPassword: String) => {
    let clientString: string = clientId + ':' + clientPassword
    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientString).toString('base64')
        }
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log("err caught - ")
            console.log(err)
        })
}