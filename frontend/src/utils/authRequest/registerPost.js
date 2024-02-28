import axios from 'axios'
import { errorAuthManagement } from '../services/hooksAuth'

const registerPost = async (userData, router, setErrorAuth) => {
  // setErrorAuth('')
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, userData)
    .then(function (res) {
      router.push('/login')
      // setErrorAuth('')
    })
    .catch(function (err) {
      errorAuthManagement(err, setErrorAuth)
    })
}

export default registerPost
