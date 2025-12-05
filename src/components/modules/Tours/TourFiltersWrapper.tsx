import { getAllDivisions } from "@/services/admin/divisionsManagement";
import { getAllTourTypes } from "@/services/admin/tourManagement";
import TourFiltersClient from "./TourFiltersClient";

export default async function TourFiltersWrapper() {
    let divisionData, tourTypeData;

    try {
        [divisionData, tourTypeData] = await Promise.all([
            getAllDivisions(),
            // 💡 FIX: এখন getAllTourTypes() অবজেক্ট গ্রহণ করতে পারে, তাই এই কলটি বৈধ
            getAllTourTypes({ limit: 1000, fields: "_id,name" }),
        ]);
    } catch (error) {
        console.error("Error fetching filter data:", error);
        return <p className="text-red-500">Failed to load filters.</p>;
    }

    // 2. ডেটা ম্যাপ করা
    const divisionOption = divisionData?.data?.map(
        (item: { _id: string; name: string }) => ({
            label: item.name,
            value: item._id,
        })
    ) || [];

    const tourTypeOptions = tourTypeData?.data?.map(
        (item: { _id: string; name: string }) => ({
            label: item.name,
            value: item._id,
        })
    ) || [];


    // 3. ক্লায়েন্ট কম্পোনেন্ট রেন্ডার করা এবং ডেটা পাস করা
    return (
        <TourFiltersClient
            divisionOption={divisionOption}
            tourTypeOptions={tourTypeOptions}
            divisionIsLoading={false}
            tourTypeIsLoading={false}
        />
    );
}