"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

interface Column<TData> {
  key: keyof Omit<TData, "id"> | "actions";
  label: string;
}

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  renderCell: (item: TData, columnKey: Column<TData>["key"]) => React.ReactNode;
  // searchKey: string;
}
export default function DataTable<TData>({
  columns,
  data,
  renderCell,
}: DataTableProps<TData>) {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);
  return (
    <>
      <Table
        aria-label="Example table with dynamic content"
        bottomContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              loop
              color="primary"
              page={page}
              total={pages}
              onChange={(page: number) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key as string}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent="No data found">
          {(item) => (
            <TableRow key={String((item as any).id)}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as Column<TData>["key"])}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
