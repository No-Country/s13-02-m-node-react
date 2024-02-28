import axios from 'axios'
import { errorAuthManagement } from '../services/hooksAuth'
const loginPost = async (userData, router, setErrorAuth) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, userData)
    .then(function (res) {
      localStorage.setItem('avatar', res.data.username[0])
      //localStorage.setItem('lives', res.data.getUser.life)
      localStorage.setItem('idKey', res.data.accessToken)
      router.push('/')
      //setErrorAuth('')
    })
    .catch(function (err) {
      errorAuthManagement(err, setErrorAuth)
    })
}

export default loginPost
