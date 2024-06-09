import { DogDetails } from "./DogDetails";

export function DogList({ dogs }) {
  return (
    <div>
      {dogs.data.map((dog) => {
        return <DogDetails dog={dog} key={ dog.name } />;
      })}
    </div>
  );
}
