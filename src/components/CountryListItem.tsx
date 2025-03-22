import { memo } from 'react';
import { Country } from '../types';

interface CountryListItemProps {
  country: Country;
  isVisited: boolean;
  onClick: (country: string) => void;
}

const CountryListItem = memo(function CountryListItem({
  country,
  isVisited,
  onClick,
}: CountryListItemProps) {
  const {
    name: { common },
    population,
    region,
    flags: { png, alt },
  } = country;
  return (
    <li
      key={common}
      className={`${isVisited ? 'bg-green-300' : 'bg-white'} shadow-md rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 w-full max-w-xs mx-auto cursor-pointer`}
      onClick={() => onClick(common)}
    >
      <img src={png} alt={alt} className="w-full h-20 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-90 mb-2">{common}</h2>
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
});

export default CountryListItem;
