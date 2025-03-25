import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const welcomesectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add WelcomeSection
    addWelcomeSection: builder.mutation({
      query: (data) => ({
        url: "/welcome-section/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('WelcomeSection'),
    }),

    // Get WelcomeSection
    getWelcomeSection: builder.query({
      query: () => ({
        url: "/welcome-section",
      }),
      providesTags: getTagsByModuleName('WelcomeSection'),
    }),

    // Update WelcomeSection
    updateWelcomeSection: builder.mutation({
      query: ({ id, data }) => ({
        url: `/welcome-section/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('WelcomeSection'),
    }),

    // Delete WelcomeSection
    deleteWelcomeSection: builder.mutation({
      query: (id) => ({
        url: `/welcome-section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('WelcomeSection'),
    }),
  }),
});

export const {
  useAddWelcomeSectionMutation,
  useGetWelcomeSectionQuery,
  useUpdateWelcomeSectionMutation,
  useDeleteWelcomeSectionMutation,
} = welcomesectionApi;
