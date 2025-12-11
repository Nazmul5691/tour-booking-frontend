

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTourById, getTourTypeById } from "@/services/admin/tourManagement";
import { useEffect, useState } from "react";

export default function GetAvailableTours({ guideInfo }: any) {
    const [tours, setTours] = useState<any[]>([]);

    const tourIds = guideInfo?.guideInfo?.availableTours || [];

    useEffect(() => {
        async function fetchTours() {
            const tourDetails: any[] = [];

            for (const id of tourIds) {
                const tour = await getTourById(id);
                if (!tour) continue;

                // FIXED: now returns correct object
                const tourType = tour.tourType
                    ? await getTourTypeById(tour.tourType._id)
                    : null;

                tourDetails.push({
                    ...tour,
                    tourTypeDetails: tourType,
                });
            }

            setTours(tourDetails);
        }

        if (tourIds.length > 0) fetchTours();
    }, [tourIds]);

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Assigned Tours</h2>

            {tours.length === 0 ? (
                <p className="text-muted-foreground">No Tours Assigned Yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Tour Type</th>
                                <th className="p-3 border">Max Guest</th>
                                <th className="p-3 border">Arrival</th>
                                <th className="p-3 border">Departure</th>
                                <th className="p-3 border">Start Date</th>
                                <th className="p-3 border">End Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tours.map((tour: any) => (
                                <tr key={tour._id} className="border">
                                    <td className="p-3 border">{tour.title}</td>

                                    <td className="p-3 border">
                                        {tour.tourTypeDetails?.data.name || "N/A"}
                                    </td>

                                    <td className="p-3 border">{tour.maxGuest}</td>
                                    <td className="p-3 border">{tour.arrivalLocation}</td>
                                    <td className="p-3 border">{tour.departureLocation}</td>
                                    <td className="p-3 border">
                                        {new Date(tour.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border">
                                        {new Date(tour.endDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
