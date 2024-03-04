import axios from 'axios'
import { errorAuthManagement } from '../services/hooksAuth'
import { setAuthData, setAvatar } from '@/redux/authSlice'
import { jwtDecode } from 'jwt-decode'

const loginPost = async (userData, router, dispatch, setErrorAuth) => {
  // setErrorAuth('')
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, userData)
    .then(function (res) {
      console.log(res)
      localStorage.setItem('avatar', res.data.username[0])
     
      dispatch(setAvatar(localStorage.getItem('avatar')))

      // localStorage.setItem('lives', res.data.getUser.life)
      localStorage.setItem('idKey', res.data.accessToken)
      localStorage.setItem('idUser', jwtDecode(res.data.accessToken).user.id)

      

      // setErrorAuth('')
      router.push('/')
    })
    .catch(function (err) {
      console.log(err)
      errorAuthManagement(err, setErrorAuth)
    })
   
}

export default loginPost
