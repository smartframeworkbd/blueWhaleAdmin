import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const grievanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Grievance
    addGrievance: builder.mutation({
      query: (data) => ({
        url: "/grievance/create",
        headers: {
          "Content-Type": undefined,
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName("Grievance"),
    }),

    // Get All Grievances
    getGrievances: builder.query({
      query: () => ({
        url: "/grievance",
      }),
      providesTags: getTagsByModuleName("Grievance"),
    }),

    // Get Grievance by ID
    getGrievanceById: builder.query({
      query: (id) => ({
        url: `/grievance/${id}`,
      }),
      providesTags: getTagsByModuleName("Grievance"),
    }),

    // Get Grievances by User ID
    getGrievancesByUser: builder.query({
      query: (userId) => ({
        url: `/grievance/user/${userId}`,
      }),
      providesTags: getTagsByModuleName("Grievance"),
    }),

    getGrievanceByTrace: builder.query({
      query: (traceNo) => ({
        url: `/grievance/trace/${traceNo}`,
      }),
      providesTags: getTagsByModuleName("Grievance"),
    }),


    updateGrievance: builder.mutation({
      query: ({ id, data }) => ({
        url: `/grievance/${id}`,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Grievance'),
    }),




  }),
});

export const {
  useAddGrievanceMutation,
  useGetGrievancesQuery,
  useGetGrievanceByIdQuery,
  useGetGrievancesByUserQuery,
  useGetGrievanceByTraceQuery,
  useUpdateGrievanceMutation
} = grievanceApi;
