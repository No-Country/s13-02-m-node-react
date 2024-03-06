import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const useGetStacks = () => {
  const [stacks, setStacks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stacks`
        )
        setStacks(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return { stacks }
}
export const useGetStacksById = (stackId) => {
  const [stackById, setStacksById] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stacks/${stackId}`
        )
        setStacksById(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    stackId ? fetchData() : {}
  }, [stackId])

  return { stackById }
}

export const useGetProgressStack = () => {
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')
  useEffect(() => {
    setUserId(localStorage.getItem('idUser'))
    setToken(localStorage.getItem('idKey'))
  }, [])
  const [progressStacks, setProgressStacks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/progress-stacks/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setProgressStacks(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    if (userId && token) {
      fetchData()
    }
  }, [userId, token])
  return { progressStacks }
}

export const useGetProgressStackById = (stackId) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(localStorage.getItem('idKey'))
  }, [])
  const [progressStacksById, setProgressStacksById] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/progress-stacks/${stackId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        //aca
        console.log(response)
        setProgressStacksById(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    if (token) {
      fetchData()
    }
  }, [token])
  return { progressStacksById }
}

export const AddStackProgress = (stackId, userId, token) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/progress-stacks/add`,
    {
      stack: stackId,
      user: userId
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
}
