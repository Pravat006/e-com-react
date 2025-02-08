import React, {  useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import productService from "@/services/product.service";
import { Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

function ProductTable() {
   const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const fetchProducts = async () => {
        try {
          const res = await productService.productTable(pageNumber);
    
          setTotalPages(res?.data?.totalPages);
          return res?.success ? res?.data?.products : [];
        } catch (error) {
          console.log("failed to fetch data");
          return error?.message;
        }
      };
      const { data, error, isLoading, isError } = useQuery({
        queryKey: ["products", pageNumber],
        queryFn: () => fetchProducts(parseInt(pageNumber)),
      });

  const copyToClipboard = (id) => {
    window.navigator.clipboard.writeText(id);
  };

  return (
    <div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">No.</TableHead>
          <TableHead className="">PRODUCT ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>AVAILABLE STOCK</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product, index) => (
          <TableRow key={product?._id}>
            <TableCell className="font-bold">{index+1}</TableCell>
            <TableCell className="font-medium flex gap-1 px-1">
              {product?._id}
              <button onClick={() => copyToClipboard(product?._id)}>
                <Copy />{" "}
              </button>{" "}
            </TableCell>
            <TableCell className="font-bold">{product?.name}</TableCell>
            <TableCell>{product?.category?.name}</TableCell>
            <TableCell className="text-purple-800 text-[1rem]">
              {product?.stock}
            </TableCell>
            <TableCell className="text-right text-green-700 text-[1rem] ">
              ${product?.price}{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="text-center items-center justify-center flex w-full p-4 ">
        <div className="flex justify-between items-center  mx-auto">
          <button
            onClick={() => setPageNumber((next) => next - 1)}
            disabled={pageNumber === 1 && true}
            className="bg-gray-300 text-black font-bold px-4 py-2"
          >
            Previus
          </button>
          <h1 className="px-4 font-bold   border-black outline-[1px] outline  mx-1">
            {pageNumber}
          </h1>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber >= totalPages && true}
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
