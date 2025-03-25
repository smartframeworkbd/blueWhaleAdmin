import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const footerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Footer
    addFooter: builder.mutation({
      query: (data) => ({
        url: "/footer/create",
        Footers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Footer'),
    }),

    // Get Footer
    getFooter: builder.query({
      query: () => ({
        url: "/footer",
      }),
      providesTags: getTagsByModuleName('Footer'),
    }),

    // Update Footer
    updateFooter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/footer/${id}`,
        Footers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Footer'),
    }),

    // Delete Footer
    deleteFooter: builder.mutation({
      query: (id) => ({
        url: `/footer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Footer'),
    }),
  }),
});

export const {
  useAddFooterMutation,
  useGetFooterQuery,
  useUpdateFooterMutation,
  useDeleteFooterMutation,
} = footerApi;
