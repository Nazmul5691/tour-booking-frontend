
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getMyApplicationsForTourGuide } from "@/services/admin/guideManagement";
import { useEffect, useState } from "react";

export default function GetMyApplications() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    async function fetchApplications() {
      const data = await getMyApplicationsForTourGuide();
      setApplications(data);
    }
    fetchApplications();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Tour Title</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Status</th>
                {/* <th className="p-3 border">Max Guest</th> */}
                {/* <th className="p-3 border">Arrival</th> */}
                {/* <th className="p-3 border">Departure</th>
                <th className="p-3 border">Start Date</th>
                <th className="p-3 border">End Date</th> */}
                <th className="p-3 border">Applied At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: any) => (
                <tr key={app._id} className="border">
                  <td className="p-3 border">{app.tour?.title || "N/A"}</td>
                  <td className="p-3 border">{app.message}</td>
                  <td className="p-3 border">{app.status}</td>
                  {/* <td className="p-3 border">{app.tour?.maxGuest || "N/A"}</td> */}
                  {/* <td className="p-3 border">{app.tour?.arrivalLocation || "N/A"}</td> */}
                  {/* <td className="p-3 border">{app.tour?.departureLocation || "N/A"}</td> */}
                  {/* <td className="p-3 border">
                    {new Date(app.tour?.startDate || "").toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    {new Date(app.tour?.endDate || "").toLocaleDateString()}
                  </td> */}
                  <td className="p-3 border">
                    {new Date(app.createdAt).toLocaleDateString()}
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
