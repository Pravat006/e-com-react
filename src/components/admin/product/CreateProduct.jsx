import React, { useEffect } from "react";
import {  set, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryService from "@/services/category.service";
import Input from "../../root/Input";
// import productService from "@/services/product.service";
import adminService from "@/services/admin.service";
import toast from "react-hot-toast";



function CreateProduct() {

  const { register, handleSubmit, watch, reset } = useForm();
  

  const [product, setProduct]= useState(null)
  const [mainImage, setMainImage] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategory();
      return response?.data.categories
    } catch (error) {
      console.log("failed to fetch data");
      return error;
    }
  };
  
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });


  // console.log(data); // it will return the categories data in an array
  const onSubmit =async  (formData) => {
    console.log("form data", formData?.subImages);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData?.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("mainImage", mainImage);
   
  
    
    if (formData.subImages && formData.subImages.length>0) {
      Array.from(formData.subImages).forEach((file) => {
        data.append("subImages", file);
      });
    }
    // console.log("data for api", data);
    // for (let pair of data.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }
    
    try {
      const res = await adminService.createProduct(data);
      if (res?.success) {
        setProduct(res?.data);
        toast.success("Product created successfully");  
        console.log("Product created successfully:", res?.data);
        reset(); // Reset the form after successful submission
      } else {
        console.log("Failed to create product:", res?.message);
      }
    } catch (error) {
      console.log("Error creating product:", error);
      return error?.message;
    }
  }

  
  const subImagesFile = watch("subImages");
  
  const handleSubImagesChange = (event) => {
    if(!event) return;
    
    console.log("sub images", event)
    setSubImages(event)
    // console.log("sub images", subImages)
  };

  // const mainImageFile = watch("mainImage");
 
  const handleImageChange = (event) => {
    if(!event) return;
    console.log("main image", event.target.files[0])
    setMainImage(event.target.files[0])
    console.log("main image", mainImage)
    
    
  };
  
  
  
  

  return (
    <div className="flex h-full w-full">
     
      <div className=" h-full w-full flex-col flex">
       
          <h1 className="font-bold text-2xl p-6"> Create Product</h1>
       

        <div className="  flex  w-full h-full">
          
          <div className="form  w-full h-full box-border flex justify-center items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" h-auto  w-3/6 px-3 flex flex-col gap-4 shadow-2xl p-4"
            >
              <div className="  w-full  items-center gap-1.5">
                <Label htmlFor="name">Name: </Label>
                <Input
                  id="name"
                  type="text"
                  className="appearance-none  "
                  placeHolder="Set the product name "
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
              <div className=" w-full  items-center gap-1.5">
                <Label htmlFor="description">Description: </Label>
                <Input
                  id="description"
                  type="text"
                  placeHolder="Set the product description "
                  {...register("description", {
                    required: true,
                  })}
                />
              </div>
              <div className=" w-full  items-center gap-1.5">
                <Label htmlFor="price">Price: </Label>
                <Input
                  id="price"
                  type="number"
                  placeHolder="Set the price amount "
                  className="appearance-none "
                  {...register("price", {
                    required: true,
                  })}
                />
              </div>

              <div className="  w-full  items-center gap-1.5">
                <Label htmlFor="stock">Stock: </Label>
                <Input
                  id="stock"
                  type="number"
                  className="appearance-none w-full"
                  placeHolder="Set the Stock amount "
                  {...register("stock", {
                    required: true,
                  })}
                />
              </div>
              <label htmlFor="category">Select category</label>
              <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="border p-2 rounded"
        >
         {
          data?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))
         }
        </select>
             

              <div className="grid w-full  items-center gap-1.5">
               
               <label htmlFor="image" className="block font-semibold mb-2">
           Upload main Image
         </label>
         <input
           type="file"
           accept="image/*"
           name="file"
           {...register("mainImage")}
           className="block"
           onChange={handleImageChange}
         />
                
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="subImg">Set sub images</Label>
                <input
                
                  id="subImg"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleSubImagesChange}
                  {...register("subImages")}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
