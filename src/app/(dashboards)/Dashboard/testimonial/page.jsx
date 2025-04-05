"use client"

import DashboardTable from "@/components/Table/DashboardTable"
import { useGetTestimonialQuery } from "@/redux/Feature/Admin/product/testimonialApi";

const Testimonial = () => {

    const {data,isLoading,isSuccess}= useGetTestimonialQuery()

    console.log(data.data)

    // console.log(data);
    

     const columns = [
        {
          title: "User Name",
          dataIndex: "name",
          key: "name",
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message",
          },
          {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
          },
          {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt",
          },
  

        
       
      ];
    
  return (
    <div>
          <div className="text-center lg:text-2xl font-bold mb-5">
Testimonials      </div>

              <DashboardTable columns={columns} data={ isSuccess && data?.data} loading={isLoading} />
        
    </div>
  )
}

export default Testimonial