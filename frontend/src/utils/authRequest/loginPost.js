import axios from 'axios'
import { errorAuthManagement } from '../services/hooksAuth'
const loginPost = async (userData, setErrorAuth, router) => {
  setErrorAuth('')
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, userData)
    .then(function (res) {
      localStorage.setItem('avatar', res.data.username[0])
      // localStorage.setItem('lives', res.data.getUser.life)
      localStorage.setItem('idKey', res.data.accessToken)
      setErrorAuth('')
      router.push('/')
    })
    .catch(function (err) {
      console.log(err)
      errorAuthManagement(err, setErrorAuth)
    })
}

export default loginPost
