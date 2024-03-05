import { useState, useEffect } from "react";
import axios from "axios";




export const useGetThemes = () => {
    const [themes, setThemes] = useState()
;

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/themes`
          )
          setThemes(response.data.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
  fetchData();
},[])

  return {themes}
  
};

export const useGetThemesById = () => {
    const [themesById, setThemesById] = useState()
;

  useEffect(() => {
    const fetchData = async (themeId) => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}themes/${themeId}`
          )
          setThemesById(response.data.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
  fetchData();
},[])

  return {themesById}
  
};

export const useGetProgressThemes=(progressStackId)=>{
    // const userId=localStorage.getItem("idUser")
    const token=localStorage.getItem("idKey")
    
  
      const [progressThemes, setProgressThemes] = useState([]);
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/progress-themes/stack/${progressStackId} `,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          setProgressThemes(response.data);
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      };
      fetchData();
    }, [token,progressStackId,setProgressThemes]);
    return {progressThemes}
  }


  export const AddThemeProgress = (themeId, progressStackId) => {
    const token=localStorage.getItem("idKey")
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/progress-themes`,
      {
        theme: themeId,
        progressStack: progressStackId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  