import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    recoverPasscode: builder.mutation({
      query: (data) => ({
        url: "/users/reset-code",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      // invalidatesTags:getTagsByModuleName('Users')
    }),

    getAdmin: builder.query({
      query: (id) => {
        const token = localStorage.getItem('authToken'); 
        return {
          url: `/admin/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: getTagsByModuleName('Admin'), 
    }),

    updateAdmin: builder.mutation({
      query: ({ id, data }) => {
        const token = localStorage.getItem('authToken');
        return {
          url: `/admin/${id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: getTagsByModuleName('Admin'), 
    }),

    changePassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('authToken');
        return {
          url: "/admin/reset-password",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: getTagsByModuleName('Admin'), 
    }),


    getUser: builder.query({
      query: (id) => {
        const token = localStorage.getItem('authToken');
        return {
          url: `/users/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: getTagsByModuleName('User'),
    }),
    
    updateSingleUser: builder.mutation({
      query: ({ id, data }) => {
        const token = localStorage.getItem('authToken');
        return {
          url: `/users/${id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: getTagsByModuleName('User'),
    }),
    
    changePasscode: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('authToken');
        return {
          url: "/users/change-pass-code",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: getTagsByModuleName('User'),
    }),
    



  }),
});

export const { 
  useLoginMutation, 
  useUserLoginMutation,
  useRegisterMutation,
  useRecoverPasscodeMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useChangePasswordMutation,
  useGetUserQuery,
  useUpdateSingleUserMutation,
  useChangePasscodeMutation

} = authApi;
