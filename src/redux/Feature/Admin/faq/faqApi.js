import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add FAQ
    addFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('FAQ'),
    }),

    // Get FAQs
    getFaqs: builder.query({
      query: () => ({
        url: "/faq",
      }),
      providesTags: getTagsByModuleName('FAQ'),
    }),

    
    // Update FAQ
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('FAQ'),
    }),

    // Delete FAQ
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('FAQ'),
    }),
  }),
});

export const {
  useAddFaqMutation,
  useGetFaqsQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
