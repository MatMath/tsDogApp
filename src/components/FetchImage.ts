import { useState } from 'react';
import axios from 'axios';

interface UseFetchBreedImage {
  image:string,
  loading:boolean,
  error:boolean,
  fetchBreedImage: (breedName:string) => {}
}

export function useFetchBreedImage():UseFetchBreedImage {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [image, setImage] = useState<string>('');

  const fetchBreedImage = async (breedName:string) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`https://dog.ceo/api/breed/${breedName}/images/random`);
      if (response.data.status !== 'success') {
        setLoading(false);
        setError(true);
      } else {
        setImage(response.data.message);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  return {
    image,
    loading,
    error,
    fetchBreedImage
  };
}
