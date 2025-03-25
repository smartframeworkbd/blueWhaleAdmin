import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Add admin
        addAdmin: builder.mutation({
            query: (data) => ({
                url: "/admin/create",
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: data,
            }),
            invalidatesTags: getTagsByModuleName('Admin'),
        }),

        // Get all admins
        getAllAdmin: builder.query({
            query: () => ({
                url: "/admin",
            }),
            providesTags: getTagsByModuleName('Admin'),
        }),

        // Update admin
        updateAdmin: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/${id}`,
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: getTagsByModuleName('Admin'),
        }),

        // Delete admin
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: getTagsByModuleName('Admin'),
        }),

    }),
});

export const {
    useAddAdminMutation,
    useGetAllAdminQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
} = adminApi;
