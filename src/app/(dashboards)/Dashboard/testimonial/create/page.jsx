"use client";
import { useAddTestimonialMutation } from "@/redux/Feature/Admin/product/testimonialApi";
import axios from "axios";
import { useState } from "react";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 1,
    image: null,
  });

  const [addTestimonial, { isLoading, isSuccess, error }] = useAddTestimonialMutation();
  const [imagePreview, setImagePreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = "";

    if (formData.image) {
      const formDataObj = new FormData();
      formDataObj.append("image", formData.image);

      try {
        const imageUploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
          formDataObj,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        uploadedImageUrl = imageUploadResponse.data.images[0].imageUrl;
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    try {
      await addTestimonial({ ...formData, image: uploadedImageUrl }).unwrap();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Testimonial</h2>
      {isSuccess && <p className="text-green-600 text-center mb-3">Testimonial submitted successfully!</p>}
      {error && <p className="text-red-600 text-center mb-3">Error submitting testimonial!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ⭐
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 mt-2 rounded-md" />}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
