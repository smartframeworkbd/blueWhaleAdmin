import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const HeaderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Header
    addHeader: builder.mutation({
      query: (data) => ({
        url: "/header/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Header'),
    }),

    // Get Header
    getHeader: builder.query({
      query: () => ({
        url: "/header",
      }),
      providesTags: getTagsByModuleName('Header'),
    }),

    // Update Header
    updateHeader: builder.mutation({
      query: ({ id, data }) => ({
        url: `/header/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Header'),
    }),

    // Delete Header
    deleteHeader: builder.mutation({
      query: (id) => ({
        url: `/header/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Header'),
    }),
  }),
});

export const {
  useAddHeaderMutation,
  useGetHeaderQuery,
  useUpdateHeaderMutation,
  useDeleteHeaderMutation,
} = HeaderApi;
