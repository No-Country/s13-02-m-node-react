import axios from 'axios'

const loginPost = async (userData, router) => {
  await axios
    .post('https://nekode-rqas.onrender.com/api/auth/login', userData)
    .then(function (res) {
      localStorage.setItem('idKey', res.data.accessToken)
      router.push('/')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default loginPost
