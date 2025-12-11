"use client";

import { ITour, ITourType } from "@/types/tour.interface";
import TourCard from "./TourCard";
import { IUser } from "@/types/user.interface";

interface TourGridProps {
  tours: ITour[];
  tourTypes: ITourType[];
  user: IUser
}

export default function TourGrid({ tours, tourTypes, user }: TourGridProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No tours found matching your criteria.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour._id} item={tour} tourTypes={tourTypes} user={user} />
      ))}
    </div>
  );
}
