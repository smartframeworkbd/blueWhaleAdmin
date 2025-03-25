
import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add User
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Users')
    }),

    // Get Users
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: getTagsByModuleName('Users')
    }),

    // Get User by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: getTagsByModuleName('Users'),
    }),

    // Update User
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Users')
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Users')
    }),

  }),
});

export const { 
  useAddUserMutation,
  useGetUsersQuery, 
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
