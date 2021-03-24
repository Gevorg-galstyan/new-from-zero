import { getToken } from "./auth";

export default async function  request(url, method="GET", body, isNeedJwt = true){
    const params = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(body){
        params.body = JSON.stringify(body)
    }

    if(isNeedJwt){
        if(!await getToken()) return;
        params.headers.Authorization = `Bearer ${await getToken()}`
    }

    return fetch(url,params)
        .then(async (res) => {

            const result = await res.json();
            if (result.status >= 400 && result.status < 600) {
                if (result.error) {
                    throw result.error
                } else {
                    throw new Error('Sorry something went wrong ')
                }
            }
           return result

        })

}