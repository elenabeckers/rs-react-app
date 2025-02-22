import { NavLink } from 'react-router';
import { Product } from '../../../../services/product.types';

interface ProductSearchResultCardProps {
  product: Product;
  isSelected: boolean;
  onToggle: () => void;
}

const ProductSearchResultCard = ({
  product,
  isSelected,
  onToggle,
}: ProductSearchResultCardProps) => {
  return (
    <li className="px-6 flex odd:bg-white dark:odd:bg-gray-200 even:bg-gray-50  dark:even:bg-gray-300">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="mr-4"
      />
      <img
        height="150"
        width="150"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="flex flex-col justify-center px-8">
        <NavLink
          className={({ isActive, isPending }) =>
            `text-xl mb-2 block transition-colors ${
              isPending
                ? 'text-gray-500'
                : isActive
                  ? 'text-blue-600 font-normal underline'
                  : 'text-gray-900 hover:text-blue-400'
            }`
          }
          to={`details/${product.id}`}
        >
          {product.title}
        </NavLink>
        <p>{product.description}</p>
      </div>
    </li>
  );
};

export default ProductSearchResultCard;
