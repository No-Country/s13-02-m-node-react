import axios from 'axios'
import { errorAuthManagement } from '../services/hooksAuth'

const registerPost = async (userData, router, setErrorAuth) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/register`, userData)
    .then(function (res) {
      router.push('/login')
      setErrorAuth('')
    })
    .catch(function (err) {
      console.log(err)
      errorAuthManagement(err, setErrorAuth)
    })
}

export default registerPost
