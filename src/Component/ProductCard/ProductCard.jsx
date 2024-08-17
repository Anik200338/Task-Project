import React from 'react';

const ProductCard = ({ product }) => {
  const {
    image,
    productName,
    category,
    rating,
    price,
    postTime,
    brand,
    description,
  } = product;

  // Format the date and time to a more readable format
  const formattedDate = new Date(postTime).toLocaleDateString();
  const formattedTime = new Date(postTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="card card-compact rounded-lg h-[450px] w-[350px] bg-white shadow-lg mb-20">
      <figure className="h-[200px] overflow-hidden">
        <img
          src={image}
          alt={productName}
          className="object-cover h-full w-full transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-semibold text-gray-800">
          {productName}
        </h2>
        <p className="text-md text-gray-600 mb-2">{category}</p>
        <p className="text-md text-gray-600 mb-2">{brand}</p>
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="font-bold text-gray-800">Rating: {rating}</p>
          <p className="font-bold text-gray-800">Price: ${price}</p>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Added on: {formattedDate} at {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
