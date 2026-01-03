
"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { IDivision } from "@/types/division.interface";
import { ITourType } from "@/types/tour.interface";

interface TourFiltersProps {
  divisions: IDivision[];
  tourTypes: ITourType[];
}

const TourFilters = ({ divisions, tourTypes }: TourFiltersProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter placeholder="Search tours..." />
        <RefreshButton />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <MultiSelectFilter
          paramName="division"
          options={divisions.map((d) => ({ value: d._id, label: d.name }))}
          placeholder="Select divisions"
        />

        <MultiSelectFilter
          paramName="tourType"
          options={tourTypes.map((t) => ({ value: t._id, label: t.name }))}
          placeholder="Select tour types"
        />

        <SelectFilter
          paramName="minAge"
          placeholder="Minimum Age"
          options={[...Array(18).keys()].map((i) => ({
            label: `${i + 1}+`,
            value: `${i + 1}`,
          }))}
        />

        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default TourFilters;
