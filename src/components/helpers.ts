// Third pary
import { capitalize, trim } from 'lodash';

// Local
import { ApiBreedList, Breed } from '../data/types';

export const augmentBreedArrayFromServer = (apiBreedList: ApiBreedList) => {
  let breedList:Breed[] = [];
  for (const [breed, value] of Object.entries(apiBreedList)) {
    if (value.length === 0) {
      breedList.push({
        breed,
        subbreed: null
      })
    } else {
      breedList = [...breedList, ...value.map((subbreed:string) => ({ breed, subbreed }))]
    }
  }
  return breedList;
}

export const trimAndCapitalizeBreedName = ({breed, subbreed}: Breed):string => {
  if (subbreed) {
    return trim(`${capitalize(subbreed)} ${capitalize(breed)}`)
  }
  return trim(`${capitalize(breed)}`)
}