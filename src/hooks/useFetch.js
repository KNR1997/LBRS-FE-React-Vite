import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(8);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = {
    Authorization: "bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          headers: headers,
        });

        if (!res.ok) {
          setError("failed to fetch");
          alert("failed to fetch");
        }
        const result = await res.json();
        setData(result.data);
        setTotal(result.meta.pagination.total);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    total,
    error,
    loading,
  };
};

export default useFetch;
