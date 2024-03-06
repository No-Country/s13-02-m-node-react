import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetUserData = () => {
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const getUserData = async (token, userId) => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        let token = localStorage.getItem('idKey');
        let userId = localStorage.getItem('idUser');

        getUserData(token, userId);
    }, []);

    return {userData, setUserData};
};
  
  