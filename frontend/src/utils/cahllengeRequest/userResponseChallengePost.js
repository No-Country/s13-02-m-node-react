import axios from 'axios'

const userResponseChallengePost = async (challengeData, token, router) => {
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}//api/questions/results`,
      challengeData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(function (res) {
      router.push('/login')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default userResponseChallengePost
