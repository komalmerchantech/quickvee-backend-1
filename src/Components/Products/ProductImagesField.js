import React, { useState } from 'react';

const ProductImagesField = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="my-6">
      <label className="block text-sm font-medium text-gray-700">Product Images</label>
      <div className="mt-2 flex items-center">
        <input
          type="file"
          multiple
          className="sr-only"
          id="productImages"
          onChange={handleFileChange}
        />
        <label
          htmlFor="productImages"
          className="cursor-pointer bg-white rounded-md border border-gray-300 p-2 mr-2 hover:bg-gray-100"
        >
          Select Images
        </label>
        <div className="flex flex-wrap">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative mr-2 mt-2">
              <img
                src={URL.createObjectURL(file)}
                alt={`Product Image ${index + 1}`}
                className="w-16 h-16 object-cover rounded-md"
              />
              <button
                onClick={() => handleRemoveFile(index)}
                className="absolute top-0 right-0 p-1 bg-white text-red-500 hover:text-red-700"
              >
                &#10006;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImagesField;
