import { Country } from '../types';
import Loader from './Loader';

interface CountryListProps {
  countries: Country[];
  visitedCountries: Set<string> | null;
  isLoading: boolean;
  onClick: (country: string) => void;
}

const CountryList = ({
  countries,
  visitedCountries,
  isLoading,
  onClick,
}: CountryListProps) => {
  if (isLoading) return <Loader />;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 max-w-6xl mx-auto">
      {countries?.map(
        ({ name: { common }, population, region, flags: { png, alt } }) => {
          const isVisited = visitedCountries?.has(common);

          return (
            <li
              key={common}
              className={`${isVisited ? 'bg-green-300' : 'bg-white'} shadow-md rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 w-full max-w-xs mx-auto cursor-pointer`}
              onClick={() => onClick(common)}
            >
              <img src={png} alt={alt} className="w-full h-20 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-90 mb-2">
                  {common}
                </h2>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Population:</span>{' '}
                  {population.toLocaleString()}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Region:</span> {region}
                </p>
                <p className="text-gray-700 text-sm h-6">
                  {isVisited && 'Country was visited!'}
                </p>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default CountryList;
