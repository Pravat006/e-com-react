import React, { useEffect, useState } from "react";
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

function ProductTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await productService.productTable();
      if (res) {
        setData(res?.data.products);
      }
    };
    fetchData();
  }, []);

  const copyToClipboard = (id) => {
    window.navigator.clipboard.writeText(id);
  };

  return (
    <Table>
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
        {data.map((product) => (
          <TableRow key={product?._id}>
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
  );
}

export default ProductTable;
