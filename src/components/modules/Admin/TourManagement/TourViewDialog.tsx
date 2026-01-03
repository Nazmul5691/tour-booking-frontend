


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TourViewDialogProps {
    open: boolean;
    onClose: () => void;
    tour: any;
}

const TourViewDialog = ({ open, onClose, tour }: TourViewDialogProps) => {
    if (!tour) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] sm:min-w-[600px] max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
                    <DialogTitle className="text-lg sm:text-xl wrap-break-word pr-6">{tour.title}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed">{tour.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm sm:text-base">
                        <p className="wrap-break-word"><b>Location:</b> {tour.location}</p>
                        <p><b>Cost From:</b> {tour.costFrom}</p>
                        <p><b>Start Date:</b> {new Date(tour.startDate).toLocaleDateString()}</p>
                        <p><b>End Date:</b> {new Date(tour.endDate).toLocaleDateString()}</p>
                        <p><b>Max Guest:</b> {tour.maxGuest}</p>
                        <p className="wrap-break-word"><b>Departure:</b> {tour.departureLocation}</p>
                        <p className="wrap-break-word"><b>Arrival:</b> {tour.arrivalLocation}</p>
                        <p className="wrap-break-word"><b>Discount:</b> {tour.discountPercentage ? `${tour.discountPercentage}% on ${new Date(tour.discountDate).toLocaleDateString()}` : "N/A"}</p>
                    </div>

                    <Separator />

                    {tour.included?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Included</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tour.included.map((i: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs sm:text-sm">{i}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {tour.excluded?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Excluded</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tour.excluded.map((i: string, idx: number) => (
                                    <Badge key={idx} variant="destructive" className="text-xs sm:text-sm">{i}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {tour.amenities?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Amenities</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tour.amenities.map((i: string, idx: number) => (
                                    <Badge key={idx} variant="secondary" className="text-xs sm:text-sm">{i}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {tour.tourPlan?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Tour Plan</h4>
                            <ul className="list-disc ml-4 sm:ml-5 space-y-1 text-sm sm:text-base">
                                {tour.tourPlan.map((step: string, idx: number) => (
                                    <li key={idx} className="wrap-break-word">{step}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TourViewDialog;