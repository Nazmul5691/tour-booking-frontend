import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("./LocationMapClient"),
  {
    ssr: false,
    loading: () => (
      <p className="text-gray-500">Loading map...</p>
    ),
  }
);

export default LocationMap;
