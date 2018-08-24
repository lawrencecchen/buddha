export function verifySession(cb) {
    fetch('https://api.supertutortv.com/v2/auth/verify', {
        method: 'POST',
        accept: 'application/vnd.sttv.app+json',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response)
        response.json()
    })
    .then(d => {
        this.setState({
            loggedIn : d.data
        })
        typeof cb === 'function' && cb()
    })
}