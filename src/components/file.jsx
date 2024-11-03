import React, { useEffect, useState } from 'react'

const File = () => {
    const [data, setData] = useState([]); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE', {
              headers: {
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
                'x-rapidapi-key': 'c7ccf96cc6msh81d8a8859597bf3p194b15jsn9fc6642fe2ef'
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            // Check if data.data exists since the API likely returns nested data
            setData(jsonData.data?.products || []);
            console.log('API Response:', jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data.length) return <p>No products found</p>;

  return (
    <div>
        <ul className="grid grid-cols-3 w-[80%] mx-auto gap-4 p-4">
       {data.map((product, index) => (
            <li key={index} className="border rounded-lg p-4 shadow-md">
              <img 
                src={product.product_photo} 
                alt={product.product_title}
                className="w-48 h-48 object-contain mx-auto"
              />
              <h3 className="font-bold text-lg mt-2">{product.product_title}</h3>
              <p className="text-green-600 font-semibold mt-1">{product.product_price}</p>
            </li>  
            ))}
        </ul>
    </div>
  )
}

export default File