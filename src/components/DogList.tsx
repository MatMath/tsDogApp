import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { Breed } from '../data/types';
import { trimAndCapitalizeBreedName } from './helpers';

interface Props {
  breeds: Breed[],
  selected: string,
  onDogSelectionHandle: (breed: Breed) => void
}

export function DogList ({ breeds, selected, onDogSelectionHandle }:Props) {
  return (
        <List style={{ textAlign: 'center' }}>
          {breeds.map(item => (
            <ListItem 
              button
              selected={selected === item.breed}
              key={`${item.breed}${item.subbreed}`}
              onClick={() => onDogSelectionHandle(item)}
            >
              <ListItemText 
                primary={trimAndCapitalizeBreedName(item)} 
                primaryTypographyProps={{ color: 'textPrimary' }}
              />
            </ListItem>
          ))}
        </List>
  );
}
