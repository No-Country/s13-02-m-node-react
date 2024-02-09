import axios from 'axios'

const loginPost = async (userData, router) => {
  await axios
    .post('', userData)
    .then(function (res) {
      console.log(res)
      localStorage.setItem('idKey', res.token)
      router.push('/')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default loginPost
