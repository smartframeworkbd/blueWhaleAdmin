"use client"

import DashboardTable from "@/components/Table/DashboardTable"
import { useGetProductCategoryQuery } from "@/redux/Feature/Admin/productCategoryApi/productCategoryApi";

const ProductCategory = () => {

    const {data,isLoading,isSuccess}= useGetProductCategoryQuery()

    // console.log(data.data)

    // console.log(data);
    

     const columns = [
        {
          title: "Category Name",
          dataIndex: "categoryName",
          key: "categoryName",
        },
        {
            title: "Status",
            dataIndex: "categoryStatus",
            key: "categoryStatus",
          },
          {
            title: "Parent",
            dataIndex: "parentId",
            key: "parentId",
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
            Product Category
      </div>

              <DashboardTable columns={columns} data={ isSuccess && data?.data} loading={isLoading} />
        
    </div>
  )
}

export default ProductCategory