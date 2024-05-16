import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProductHeader: React.FC = () => {
  const product = useSelector((state: RootState) => state.sales.product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-auto rounded-lg px-20 pt-6"
      />
      <div className="flex flex-col items-center mt-4 px-14 pb-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className="text-gray-400 text-center">{product.subtitle}</p>
      </div>
      <div className="border-t border-b border-gray-300 mt-4 py-2">
        <div className="flex flex-wrap  gap-2 px-6 py-2">
          {product.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-gray-500 px-3 py-1 border border-gray-300 rounded-[5px] text-s"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
