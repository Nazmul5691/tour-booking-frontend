

import TourDetailsBanner from "@/components/modules/Tours/TourDetailsBanner";
import TourDetailsLeft from "@/components/modules/Tours/TourDetailsLeft";
import { getAllDivisions } from "@/services/admin/divisionsManagement";
import { getAllTourTypes, getTourBySlug } from "@/services/admin/tourManagement";
import TourDetailsRightWithGuest from "@/components/modules/Tours/TourDetailsRightWithGuest";
import { getUserInfo } from "@/services/auth/getUserInfo";

const BookingDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    let user = null;
    try {
        const userRes = await getUserInfo();
        user = userRes || null;
    } catch (err) {
        console.log("User not logged in", err);
        user = null; // if 404, just set null
    }

    const [tourRes, tourTypesRes, divisionsRes] = await Promise.all([
        getTourBySlug(slug),
        getAllTourTypes(),
        getAllDivisions(),
    ]);

    const tour = tourRes?.data;
    const tourTypes = tourTypesRes?.data || [];
    const divisions = divisionsRes?.data || [];

    return (
        <div>
            <TourDetailsBanner />
            <div className="container mx-auto mt-10 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <TourDetailsLeft tour={tour} tourTypes={tourTypes} divisions={divisions} />
                <TourDetailsRightWithGuest user={user} tour={tour} />
            </div>
        </div>
    );
};

export default BookingDetailsPage;

