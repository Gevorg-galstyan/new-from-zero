import decode from 'jwt-decode';

const apiHost = process.env.REACT_APP_API_HOST;
export const getToken = ()=>{
    const token = localStorage.getItem('token');
    if (token){
        const parsed = JSON.parse(token);
        const decoded = decode(parsed.jwt)
        if(decoded.exp - 60 < new Date().getTime() / 1000){
            fetch(`${apiHost}/user/${decoded.userId}/token`,
                {
                    method: 'PUT',
                    body : JSON.stringify({
                        refreshToken: parsed.refreshToken
                    }),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(token => {
                    localStorage.setItem('token', JSON.stringify(token))

                })
        }else {

            return parsed.jwt;
        }



    }
}
export const checkLoginStatus = () => !!localStorage.getItem('token');
