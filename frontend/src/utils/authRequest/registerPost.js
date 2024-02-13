import axios from 'axios'

const registerPost = async (userData, router) => {
  await axios
    .post('', userData)
    .then(function (res) {
      router.push('/login')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default registerPost
