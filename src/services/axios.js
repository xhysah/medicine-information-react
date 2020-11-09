import Axios from 'axios'

export default function request ( option ){
    return new Promise((resolve, reject) => {
        const instance = Axios.create({
            baseURL: 'http://127.0.0.1:3000',
            timeout: 10000
        })

        instance.interceptors.request.use(config => {
			return config
		}, err => {
			return err
        })

        instance.interceptors.response.use(response => {
            return response.data
        } , err => {
            return err
        })

        instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
    })
}