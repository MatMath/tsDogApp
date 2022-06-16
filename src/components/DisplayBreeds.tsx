import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  ButtonGroup,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import BreedImage from './BreedImage';
import { useFetchBreedImage } from './FetchImage';
import { Breed } from '../data/types';
import { trimAndCapitalizeBreedName } from './helpers';
import { DogList } from './DogList';

const dogPerPage = 10;

interface Props {
  breeds: Breed[],
}

function DisplayBreeds({ breeds }: Props) {
  const [page, setPage] = useState<number>(1);
  const [activeBreed, setActiveBreed] = useState<Breed>({ breed: '', subbreed: '' });
  const [activeImage, setActiveImage] = useState<string>('');
  const [breedsList, setBreedsList] = useState<Breed[]>(breeds.slice(0, 1 * dogPerPage));
  const { image, loading, error, fetchBreedImage } = useFetchBreedImage();
  const totalPages = Math.ceil(breeds.length / dogPerPage);

  const onDogSelectionHandle = (breed: Breed) => {
    setActiveBreed(breed);
    fetchBreedImage(breed.breed)
  }

  const resetBreedSelection = () => {
    setActiveBreed({ breed: '', subbreed: '' });
  }

  useEffect(() => {
    setActiveImage(image);
  }, [image])
  
  useEffect(() => {
    setBreedsList(breeds.slice((page - 1) * dogPerPage, page * dogPerPage));
  }, [page])

  return (
    <Box style={{ marginTop: 50 }}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <Typography gutterBottom color="textPrimary">Page {page} of {totalPages}</Typography>
        <ButtonGroup variant="contained" color="primary">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}> Prev </Button>
          <Button onClick={() => setPage(page + 1)} disabled={page === 15}> Next </Button>
        </ButtonGroup>
        <DogList breeds={breedsList} onDogSelectionHandle={onDogSelectionHandle} selected={activeBreed.breed} />
      </Container>

      <Dialog
        fullWidth
        open={!!activeBreed.breed}
        maxWidth="sm"
        onClose={resetBreedSelection}
      >
        <DialogTitle>{trimAndCapitalizeBreedName(activeBreed)}</DialogTitle>
        <DialogContent>
          <BreedImage
            loading={loading}
            error={error}
            image={activeImage}
            breed={activeBreed.breed}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={() => fetchBreedImage(activeBreed.breed)}>
            Get another image
          </Button>
          <Button variant="contained" color="primary" onClick={resetBreedSelection}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default DisplayBreeds;
