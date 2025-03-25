
import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const emailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Email
    addEmail: builder.mutation({
      query: (data) => ({
        url: "/email/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Email'),
    }),

    // Get Emails
    getEmails: builder.query({
      query: () => ({
        url: "/email",  // Email fetching endpoint
      }),
      providesTags: getTagsByModuleName('Email'),
    }),

    // Update Email
    updateEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/email/${id}`,  // Update email by ID
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Email'),
    }),

    // Delete Email
    deleteEmail: builder.mutation({
      query: (id) => ({
        url: `/email/${id}`,  // Delete email by ID
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Email'),
    }),
  }),
});

export const {
  useAddEmailMutation,
  useGetEmailsQuery,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
} = emailApi;
