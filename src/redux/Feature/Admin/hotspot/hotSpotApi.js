import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const hotspotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Hotspot
    addHotspot: builder.mutation({
      query: (data) => ({
        url: "/hotspot/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Hotspot'),
    }),

    // Get Hotspots
    getHotspots: builder.query({
      query: () => ({
        url: "/hotspot",
      }),
      providesTags: getTagsByModuleName('Hotspot'),
    }),

    // Get Single Hotspot
    getHotspot: builder.query({
      query: (id) => ({
        url: `/hotspot/${id}`,
      }),
      providesTags: getTagsByModuleName('Hotspot'),
    }),

    // Update Hotspot
    updateHotspot: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hotspot/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Hotspot'),
    }),

    // Delete Hotspot
    deleteHotspot: builder.mutation({
      query: (id) => ({
        url: `/hotspot/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Hotspot'),
    }),

    // Upload Image
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      }),
    }),
  }),
});

export const {
  useAddHotspotMutation,
  useGetHotspotsQuery,
  useGetHotspotQuery,
  useUpdateHotspotMutation,
  useDeleteHotspotMutation,
  useUploadImageMutation,
} = hotspotApi;
