import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import DisplayBreeds from './DisplayBreeds';
import { augmentBreedArrayFromServer } from './helpers';
import { Breed } from '../data/types';

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';

export function FetchBreeds() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(BREED_LIST_URL);
        const serverList = JSON.parse(response.request.response).message;
        const breedList = augmentBreedArrayFromServer(serverList);
        setBreeds(breedList)
        setLoading(false)
      } catch (e) {
        setError(true)
        setLoading(false)
      }
    };
    fetchBreeds();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ marginTop: 32 }}>
        <Alert severity="info">Loading...</Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" style={{ marginTop: 32 }}>
        <Alert severity="error">
          Error while fetching the data, here is a kitten instead until we look at the issue.
        </Alert>
        <img src="https://placekitten.com/500/500" alt="Place kitten"/>
      </Container>
    );
  }

  return (
    <DisplayBreeds breeds={breeds} />
  );
}
