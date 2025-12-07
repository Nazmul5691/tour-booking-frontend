


"use client";

import { Column } from "@/components/shared/ManagementTable";
import { IDivision } from "@/types/division.interface";

export const divisionsColumns: Column<IDivision>[] = [
  {
    header: "Name",
    accessor: (division) => division.name,
  },
  {
    header: "Description",
    accessor: (division) => division.description || "-",
  },
];
