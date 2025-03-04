import Link from 'next/link';
import { Product } from '../../../../services/product.types';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { page = 1, query = '', productId } = router.query;

  const isActive = product.id === Number(productId);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(
      `/?query=${query}&page=${page}&productId=${product.id}`,
      undefined,
      { shallow: true }
    );
  };

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
        <Link
          href={`/?query=${query}&page=${page}&productId=${product.id}`}
          onClick={handleClick}
          className={`text-xl mb-2 block transition-colors ${isActive ? 'text-blue-500' : 'text-gray-900'} hover:text-blue-400`}
        >
          {product.title}
        </Link>
        <p>{product.description}</p>
      </div>
    </li>
  );
};

export default ProductSearchResultCard;
