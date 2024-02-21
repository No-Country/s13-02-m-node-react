import axios from 'axios'

const registerPost = async (userData, router) => {
  await axios
    .post('https://nekode-rqas.onrender.com/api/auth/register', userData)
    .then(function (res) {
      router.push('/login')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default registerPost
