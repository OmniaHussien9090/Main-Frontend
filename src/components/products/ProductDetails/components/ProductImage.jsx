import React from 'react';

const ProductImages = ({ variant, selectedImage, setSelectedImage }) => {
  return (
    <div className="md:w-1/2 flex md:flex-row flex-col gap-2">
      <div className="flex md:flex-col flex-row gap-2">
        {variant.images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`  ${
              selectedImage === index ? "border border-orange-500" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="md:w-27 w-15 md:h-22.5 h-15 object-cover"
            />
          </button>
        ))}
      </div>
      
      <div className="flex-1">
        <img
          src={variant.images?.[selectedImage] || variant.image || "/placeholder.jpg"}
          alt={variant.name?.en || "Product"}
          className="h-auto w-full object-cover "
        />
      </div>
    </div>
  );
};

export default ProductImages;