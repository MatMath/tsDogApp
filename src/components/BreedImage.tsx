import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';

interface BreedImageProps {
  loading:boolean,
  error:boolean,
  breed:string,
  image:string,
}

function BreedImage({
  loading,
  error,
  breed,
  image,
}:BreedImageProps) {
  if (loading) return <Alert severity="info">Loading image...</Alert>;
  if (error) return <Alert severity="error">There was a problem loading the image</Alert>;
  return <img src={image} alt={breed} style={{ width: '100%', maxWidth: '100%' }} />;
}

export default BreedImage;
