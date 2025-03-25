"use client";

import { useState, useEffect } from "react";
import { useAddProductMutation } from "@/redux/Feature/Admin/product/productApi";
import { useGetProductCategoryQuery } from "@/redux/Feature/Admin/productCategoryApi/productCategoryApi";
import axios from "axios";
import { toast } from "sonner";
import Multiselect from "multiselect-react-dropdown";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productTitle: "",
    productSubTitle: "",
    productDescription: "",
    productIsFeatured: false,
    productImage: [],
    productVideo: [],
    productTags: [],
    productPrice: "",
    productPriceIsDisplayed: false,
    productStock: "",
    productStatus: true,
    productOrder: "",
    productCategories: [], // Array to store selected category IDs
    productGalaries: [], // Array to store product galleries
  });

  const [error, setError] = useState("");
  const [addProduct, { isLoading, isError, isSuccess, error: serverError }] = useAddProductMutation();
  const { data: productCategory } = useGetProductCategoryQuery();

  // Monitor mutation state changes and show appropriate toasts
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product created successfully!");
      resetForm();
    }

    if (isError) {
      const errorMessage = serverError?.data?.message || "Failed to create product. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, serverError]);

  const resetForm = () => {
    setFormData({
      productTitle: "",
      productSubTitle: "",
      productDescription: "",
      productIsFeatured: false,
      productImage: [],
      productVideo: [],
      productTags: [],
      productPrice: "",
      productPriceIsDisplayed: false,
      productStock: "",
      productStatus: true,
      productOrder: "",
      productCategories: [],
      productGalaries: [],
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (name === "productTitle") {
      updatedValue = value;
      setFormData({
        ...formData,
        productTitle: updatedValue,
      });
    } else {
      setFormData({ ...formData, [name]: updatedValue });
    }
  };

  const handleTagChange = (e) => {
    setFormData({
      ...formData,
      productTags: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      productImage: files,
    });
  };

  // Handle category selection
  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedItem);
    setFormData({
      ...formData,
      productCategories: selectedList.map((item) => item.Id),
    });
  };

  // Handle category removal
  const onRemove = (selectedList, removedItem) => {
    setFormData({
      ...formData,
      productCategories: selectedList.map((item) => item.categoryId),
    });
  };

  // Add new gallery item
  const addGalleryItem = () => {
    setFormData({
      ...formData,
      productGalaries: [
        ...formData.productGalaries,
        { title: "", image: null },
      ],
    });
  };

  // Handle gallery title change
  const handleGalleryTitleChange = (index, value) => {
    const updatedGalleries = [...formData.productGalaries];
    updatedGalleries[index].title = value;
    setFormData({
      ...formData,
      productGalaries: updatedGalleries,
    });
  };

  // Handle gallery image upload
  const handleGalleryImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedGalleries = [...formData.productGalaries];
    updatedGalleries[index].image = file;
    setFormData({
      ...formData,
      productGalaries: updatedGalleries,
    });
  };

  // Remove gallery item
  const removeGalleryItem = (index) => {
    const updatedGalleries = [...formData.productGalaries];
    updatedGalleries.splice(index, 1);
    setFormData({
      ...formData,
      productGalaries: updatedGalleries,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productTitle) {
      setError("Product title is required");
      toast.error("Product title is required");
      return;
    }
    setError("");

    const loadingToast = toast.loading("Creating product...");

    try {
      // Upload main product images
      let imageFormData = new FormData();
      formData.productImage.forEach((file) => {
        imageFormData.append(`image`, file);
      });

      let uploadedImageUrls = [];
      if (formData.productImage.length > 0) {
        try {
          const imageUploadResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
            imageFormData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          uploadedImageUrls = imageUploadResponse.data.images;
        } catch (uploadError) {
          toast.dismiss(loadingToast);
          console.error("Image upload failed:", uploadError);
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      // Upload gallery images
      const processedGalleries = [];
      for (let i = 0; i < formData.productGalaries.length; i++) {
        const gallery = formData.productGalaries[i];
        
        if (gallery.image) {
          const galleryFormData = new FormData();
          galleryFormData.append("image", gallery.image);
          
          try {
            const galleryUploadResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
              galleryFormData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
            
            if (galleryUploadResponse.data.images && galleryUploadResponse.data.images.length > 0) {
              processedGalleries.push({
                title: gallery.title,
                image: galleryUploadResponse.data.images[0],
              });
            }
          } catch (uploadError) {
            console.error(`Gallery image ${i} upload failed:`, uploadError);
            // Continue with other galleries even if one fails
          }
        }
      }

      const productData = {
        ...formData,
        productImage: uploadedImageUrls,
        productGalaries: processedGalleries,
      };

      await addProduct(productData).unwrap();
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Product creation failed:", error);
      const errorMessage = error?.data?.errorMessages[0]?.message || "Failed to create product. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const handleSelect = (value) => {
    console.log(value);
    // productCategory?.data?.filter((category) =>
    //   formData.productCategories.includes(category.categoryId)
    // )
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-5">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Add Product</h2>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm flex items-center`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : "Add Product"}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title*</label>
            <input
              type="text"
              name="productTitle"
              value={formData.productTitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              name="productSubTitle"
              value={formData.productSubTitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              placeholder="Enter subtitle (optional)"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                name="productStock"
                value={formData.productStock}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              rows="3"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none resize-none"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="productTags"
              value={formData.productTags.join(", ")}
              onChange={handleTagChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          {/* Product Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Categories</label>
            <Multiselect
              options={productCategory?.data || []} // Options to display
              onSelect={onSelect} // Function to handle selection
              onRemove={onRemove} // Function to handle removal
              displayValue="categoryName" // Property to display in the dropdown
              placeholder="Select categories"
              style={{
                chips: { background: "#007bff" }, // Customize chip styles
                searchBox: { border: "1px solid #ddd", borderRadius: "4px" }, // Customize search box
              }}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="product-images"
              />
              <label
                htmlFor="product-images"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
          </div>

          {formData.productImage.length > 0 && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
              <div className="grid grid-cols-3 gap-2">
                {formData.productImage.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="h-20 w-full object-cover rounded border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...formData.productImage];
                        newImages.splice(index, 1);
                        setFormData({ ...formData, productImage: newImages });
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Galleries Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Product Galleries</label>
              <button
                type="button"
                onClick={addGalleryItem}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
              >
                Add Gallery
              </button>
            </div>
            
            {formData.productGalaries.length === 0 && (
              <div className="text-center py-3 bg-gray-50 rounded-md border border-dashed border-gray-300">
                <p className="text-sm text-gray-500">No galleries added yet</p>
              </div>
            )}

            {formData.productGalaries.map((gallery, index) => (
              <div key={index} className="mb-3 p-3 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Gallery {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(index)}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="mb-2">
                  <label className="block text-xs text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={gallery.title}
                    onChange={(e) => handleGalleryTitleChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter gallery title"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Image</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={(e) => handleGalleryImageUpload(index, e)}
                      className="hidden"
                      id={`gallery-image-${index}`}
                      accept="image/*"
                    />
                    <label
                      htmlFor={`gallery-image-${index}`}
                      className="cursor-pointer text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md"
                    >
                      Choose file
                    </label>
                    <span className="text-xs text-gray-500">
                      {gallery.image ? gallery.image.name : "No file chosen"}
                    </span>
                  </div>
                  
                  {gallery.image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(gallery.image)}
                        alt={`Gallery ${index} preview`}
                        className="h-16 w-auto object-cover rounded border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h3 className="font-medium text-gray-700 mb-3 text-sm">Product Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="productIsFeatured"
                  checked={formData.productIsFeatured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Product</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="productPriceIsDisplayed"
                  checked={formData.productPriceIsDisplayed}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Display Price</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="productStatus"
                  checked={formData.productStatus}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active (Product is visible)</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;