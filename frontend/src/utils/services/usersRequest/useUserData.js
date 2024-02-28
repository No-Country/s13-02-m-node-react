import { useState, useEffect } from "react";
import axios from "axios";

export const useUserData = (page) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            params: {
              orderBy: "totalPoints",
              order: "ASC",
              page: page,
              limit: 10,
            },
          }
        );
        setUserData(response.data.data);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [page]);

  return { userData, loading, error, pagination, setError };
};
