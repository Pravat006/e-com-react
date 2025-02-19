import React, { useState } from "react";

import productService from "@/services/product.service";
import { Copy } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import adminService from "@/services/admin.service";
import toast from "react-hot-toast";

function ProductTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [prevPage, setPrevPage] = useState(0);
  const [limit, setLimit] = useState();
  const [open , setOpen] = useState(false);

  // Initialize QueryClient
  const queryClient = useQueryClient();

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const res = await productService.productTable(pageNumber);
      setLimit(res?.data.limit);
      if (res?.data.prevPage === null) {
        setPrevPage(0);
      } else {
        setPrevPage(res?.data.prevPage);
      }

      setTotalPages(res?.data?.totalPages);
      return res?.success ? res?.data?.products : [];
    } catch (error) {
      console.log("failed to fetch data");
      return error?.message;
    }
  };

  // Delete product function
  const deletedItem = async (id) => {
    try {
      const res = await adminService.deleteProduct(id);
      if (res?.success) {
        toast.success("Product successfully deleted");
      }
    } catch (error) {
      toast.error(error?.message);
      return error?.message;
    }
  };

  // UseMutation hook for deleting a product
  const mutation = useMutation({
    mutationFn: deletedItem,
    onSuccess: () => {
      setOpen(false);
      // Invalidate and refetch products query after successful deletion
      queryClient.invalidateQueries("products");
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
    
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: fetchProducts,
  });

  const copyToClipboard = (id) => {
    window.navigator.clipboard.writeText(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr className="divide-x">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Available stock</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Delete Item</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {data.map((item, idx) => (
              <tr key={idx} className="divide-x">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-6">
                  <span>{idx + limit * prevPage + 1}</span>
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={()=>setOpen(true)} >Delete</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-between">
                        <h1>Are you sure you want to delete the Product ? </h1>
                        <div className="flex justify-evenly gap-1">
                          <button
                            className="px-3 bg-green-800 text-white font-bold"
                            onClick={() => handleDelete(item?._id)}
                          >
                            confirm
                          </button>
                          <DialogClose asChild>
                            <button className="px-3 bg-red-800 text-white font-bold">
                              No
                            </button>
                          </DialogClose>
                        </div>
                      </div>

                      <DialogFooter className="sm:justify-start"></DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center items-center justify-center flex w-full p-4 ">
        <div className="flex justify-between items-center  mx-auto">
          <button
            onClick={() => setPageNumber((next) => next - 1)}
            disabled={pageNumber === 1}
            className="bg-gray-300 text-black font-bold px-4 py-2"
          >
            Previous
          </button>
          <h1 className="px-4 font-bold   border-black outline-[1px] outline  mx-1">
            {pageNumber}
          </h1>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber >= totalPages}
            className="bg-gray-300 text-black font-bold px-8 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
