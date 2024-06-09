import { useParams } from "react-router-dom";

import { DogDetails } from "./DogDetails";

export function FilterDogDetails({ dogs }) {
  const { name } = useParams();
  if (!name) return null;

  const currDog = dogs.data.find(
    (dog) => dog.name.toLowerCase() === name.toLowerCase(),
  );

  return <DogDetails dog={currDog} key={currDog.name} />;
}
