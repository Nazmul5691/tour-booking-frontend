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
            <DialogContent className="min-w-[600px] max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{tour.title}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                    <p>{tour.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p><b>Location:</b> {tour.location}</p>
                        <p><b>Cost From:</b> {tour.costFrom}</p>
                        <p><b>Start Date:</b> {new Date(tour.startDate).toLocaleDateString()}</p>
                        <p><b>End Date:</b> {new Date(tour.endDate).toLocaleDateString()}</p>
                        <p><b>Max Guest:</b> {tour.maxGuest}</p>
                        <p><b>Departure:</b> {tour.departureLocation}</p>
                        <p><b>Arrival:</b> {tour.arrivalLocation}</p>
                        <p><b>Discount:</b> {tour.discountPercentage ? `${tour.discountPercentage}% on ${new Date(tour.discountDate).toLocaleDateString()}` : "N/A"}</p>
                    </div>

                    <Separator />

                    {tour.included?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-1">Included</h4>
                            {tour.included.map((i: string, idx: number) => (
                                <Badge key={idx} variant="outline">{i}</Badge>
                            ))}
                        </div>
                    )}

                    {tour.excluded?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-1">Excluded</h4>
                            {tour.excluded.map((i: string, idx: number) => (
                                <Badge key={idx} variant="destructive">{i}</Badge>
                            ))}
                        </div>
                    )}

                    {tour.amenities?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-1">Amenities</h4>
                            {tour.amenities.map((i: string, idx: number) => (
                                <Badge key={idx} variant="secondary">{i}</Badge>
                            ))}
                        </div>
                    )}

                    {tour.tourPlan?.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-1">Tour Plan</h4>
                            <ul className="list-disc ml-5">
                                {tour.tourPlan.map((step: string, idx: number) => <li key={idx}>{step}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TourViewDialog;
