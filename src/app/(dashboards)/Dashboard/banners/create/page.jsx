'use client';

import { useState } from 'react';
import axios from 'axios';

const CreateBanner = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    order: '',
    buttons: [],
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonChange = (index, field, value) => {
    const updatedButtons = [...form.buttons];
    updatedButtons[index][field] = value;
    setForm((prev) => ({
      ...prev,
      buttons: updatedButtons,
    }));
  };

  const addButton = () => {
    setForm((prev) => ({
      ...prev,
      buttons: [...prev.buttons, { text: '', link: '' }],
    }));
  };

  const removeButton = (index) => {
    const updatedButtons = [...form.buttons];
    updatedButtons.splice(index, 1);
    setForm((prev) => ({
      ...prev,
      buttons: updatedButtons,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedImageUrl = '';
      if (imageFile) {
        const galleryFormData = new FormData();
        galleryFormData.append('image', imageFile);

        const galleryUploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
          galleryFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (
          galleryUploadResponse.data.images &&
          galleryUploadResponse.data.images.length > 0
        ) {
          uploadedImageUrl = galleryUploadResponse.data.images[0].imageUrl;
        }
      }

      const payload = {
        ...form,
        imageUrl: uploadedImageUrl,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/banners`,
        payload
      );

      alert('Banner created successfully');
    } catch (error) {
      console.error('Error creating banner:', error);
      alert('Failed to create banner');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Create Banner</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Short Description</label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Order</label>
          <input
            name="order"
            value={form.order}
            onChange={handleChange}
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Button Fields */}
        <div>
          <label className="block font-medium mb-2">Buttons</label>
          {form.buttons.map((button, index) => (
            <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
              <div className="mb-2">
                <input
                  placeholder="Button Text"
                  value={button.text}
                  onChange={(e) =>
                    handleButtonChange(index, 'text', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                />
                <input
                  placeholder="Button Link"
                  value={button.link}
                  onChange={(e) =>
                    handleButtonChange(index, 'link', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="button"
                onClick={() => removeButton(index)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove Button
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addButton}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Button
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 object-contain"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Create Banner
        </button>
      </form>
    </div>
  );
};

export default CreateBanner;
