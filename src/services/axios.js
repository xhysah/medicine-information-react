import Axios from 'axios'

export default function request ( option ){
    return new Promise((resolve, reject) => {
        const instance = Axios.create({
            baseURL: 'http://127.0.0.1:3000',
            timeout: 10000,
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

        instance.interceptors.request.use(config => {
			return config
		}, err => {
			throw err
        })

        instance.interceptors.response.use(response => {
            if(response.data !== '请重新登陆'){
                return response.data
            }else{
                localStorage.removeItem('token')
            }
        } , err => {
            throw err
        })

        instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
    })
}