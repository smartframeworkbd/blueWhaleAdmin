"use client";

import { useAddProductCategoryMutation } from "@/redux/Feature/Admin/productCategoryApi/productCategoryApi";
import { useState } from "react";

const ProductCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categorySlug: "",
    categoryStatus: true,
    parentId: "0",
  });

  const [setProductCategoryData, { isLoading, error: apiError }] = useAddProductCategoryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // if (name === "categoryName") {
    //   updatedData.categorySlug = slugify(value, { lower: true, strict: true });
    // }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryName.trim()) {
      return;
    }

    try {
      await setProductCategoryData(formData).unwrap();
      setFormData({
        categoryName: "",
        categorySlug: "",
        categoryStatus: true,
        parentId: "0",
      });
      alert("Category Created Successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Product Category</h2>

      {apiError && <p className="text-red-500 text-sm mb-3">{apiError.data?.message || "Something went wrong"}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Category Slug</label>
          <input
            type="text"
            name="categorySlug"
            value={formData.categorySlug}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Category</label>
          <select
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="0">None</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="categoryStatus"
            checked={formData.categoryStatus}
            onChange={() =>
              setFormData({ ...formData, categoryStatus: !formData.categoryStatus })
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Active</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductCategory;
