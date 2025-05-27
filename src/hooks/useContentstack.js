import { useState, useEffect } from 'react';
import axios from 'axios';

const useContentstack = (contentType) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Log environment variables for debugging
        console.log('Environment Variables:', {
          apiKey: import.meta.env.VITE_API_KEY,
          deliveryToken: import.meta.env.VITE_DELIVERY_TOKEN,
          environment: import.meta.env.VITE_ENVIRONMENT
        });

        const response = await axios.get(
          `https://cdn.contentstack.io/v3/content_types/${contentType}/entries`,
          {
            params: { environment: import.meta.env.VITE_ENVIRONMENT },
            headers: {
              api_key: import.meta.env.VITE_API_KEY,
              access_token: import.meta.env.VITE_DELIVERY_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(`Fetched ${contentType} data:`, response.data);
        setData(response.data.entries);
      } catch (error) {
        console.error(`Error fetching ${contentType}:`, error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          setError(`Server error: ${error.response.status} - ${error.response.data.error_message || error.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          setError('No response received from server. Please check your internet connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(error.message || `Failed to fetch ${contentType} data`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [contentType]);

  return { data, isLoading, error };
};

export default useContentstack; 