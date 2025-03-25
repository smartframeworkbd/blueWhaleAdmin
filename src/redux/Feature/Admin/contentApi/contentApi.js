import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Content
    addContent: builder.mutation({
      query: (data) => ({
        url: "/content/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Content'),
    }),

    // Get Content
    getContent: builder.query({
      query: () => ({
        url: "/content",
      }),
      providesTags: getTagsByModuleName('Content'),
    }),

    
    // Update Content
    updateContent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/content/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Content'),
    }),

    // Delete Content
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Content'),
    }),


    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      }),
    }),
  }),
});

export const {
  useAddContentMutation,
  useGetContentQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useUploadImageMutation
} = contentApi;
