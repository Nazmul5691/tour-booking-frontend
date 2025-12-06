
import TourDetailsBanner from "@/components/modules/Tours/TourDetailsBanner";
import TourDetailsLeft from "@/components/modules/Tours/TourDetailsLeft";
import TourDetailsRight from "@/components/modules/Tours/TourDetailsRight";
import { getAllDivisions } from "@/services/admin/divisionsManagement";
import { getAllTourTypes, getTourBySlug } from "@/services/admin/tourManagement";

const TourDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params;


  const [tourRes, tourTypesRes, divisionsRes] = await Promise.all([
    getTourBySlug(slug),
    getAllTourTypes(),
    getAllDivisions(),
  ]);

  // console.log(slug);


  const tour = tourRes?.data;
  const tourTypes = tourTypesRes?.data || [];
  const divisions = divisionsRes?.data || [];

  // console.log('tour', tour);

  return (
    <div >
      <div>
        <TourDetailsBanner />

        <div className="container mx-auto mt-10 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* left side tour details*/}
          <TourDetailsLeft tour={tour} tourTypes={tourTypes} divisions={divisions} />

          {/* right side tour details*/}
          <TourDetailsRight tour={tour} />

        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;
