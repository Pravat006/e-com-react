import React from "react";

import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CategoryTable() {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const res = await categoryService.getAllCategory();
        return res?.success ? res?.data.categories : [];
      } catch (error) {
        return error?.message;
      }
    },
  });
  console.log(data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >No.</TableHead>
            <TableHead >ID</TableHead>
            <TableHead >NAME</TableHead>
            <TableHead >Created At</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
            <TableHead className="text-right">Expiring on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{item?._id}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell  className="text-right">{item.updatedAt}</TableCell>
              <TableCell className="text-right">{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
