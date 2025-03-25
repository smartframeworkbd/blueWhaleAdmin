import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const breakingnews = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add breakingnews
    addbreakingnews: builder.mutation({
      query: (data) => ({
        url: "/breaking-news/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('breakingnews'),
    }),

    // Get breakingnews
    getbreakingnews: builder.query({
      query: () => ({
        url: "/breaking-news",
      }),
      providesTags: getTagsByModuleName('breakingnews'),
    }),

    // Update breakingnews
    updatebreakingnews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/breaking-news/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('breakingnews'),
    }),

    // Delete breakingnews
    deletebreakingnews: builder.mutation({
      query: (id) => ({
        url: `/breaking-news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('breakingnews'),
    }),
  }),
});

export const {
  useAddbreakingnewsMutation,
  useGetbreakingnewsQuery,
  useUpdatebreakingnewsMutation,
  useDeletebreakingnewsMutation,
} = breakingnews;
