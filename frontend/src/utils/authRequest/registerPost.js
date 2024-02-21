import axios from 'axios'

const registerPost = async (userData, router) => {
  await axios
    .post(
      'https://nokode-dev-377e08606aa4.herokuapp.com/api/auth/register',
      userData
    )
    .then(function (res) {
      router.push('/login')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default registerPost
