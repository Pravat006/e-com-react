import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import productService from "@/services/product.service";

function ProductTable() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const res = await productService.getAllProducts();
      
      if (res) {
        setData(res?.data.products);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">PRODUCT ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>AVAILABLE STOCK</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { data.map((product) => (
          <TableRow key={product?._id}>
            <TableCell className="font-medium">{product?._id}</TableCell>
            <TableCell className="font-bold">{product?.name}</TableCell>
            <TableCell>{product?.category?.name}</TableCell>
            <TableCell className="text-purple-800 text-[1rem]">{product?.stock}</TableCell>
            <TableCell className="text-right text-green-700 text-[1rem] ">${product?.price}  </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProductTable;
