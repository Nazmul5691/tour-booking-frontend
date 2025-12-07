"use client";
import { Column } from "@/components/shared/ManagementTable";

export interface ITourType {
  _id: string;
  name: string;
}

export const tourTypesColumns: Column<ITourType>[] = [
  {
    header: "Name",
    accessor: (tourType) => tourType.name,
  },
];
