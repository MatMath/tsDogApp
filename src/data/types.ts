export interface ApiBreedList {
  [key:string]:string[] | []
}

export interface Breed {
  breed: string,
  subbreed: null | string, 
}