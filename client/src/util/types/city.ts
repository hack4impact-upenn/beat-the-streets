/**
 * Interface for the city data type return from the backend
 */
interface ICity {
  _id: string;
  cityName: string;
  isAccredited: boolean;
  countiesCovered: [string];
  indicators: Map<string, Map<string, number>>;
  established: number;
}

export default ICity;
