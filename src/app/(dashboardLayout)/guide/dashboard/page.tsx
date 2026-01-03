
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";
import { getGuideInfo, getGuideStats } from "@/services/guide/guideStats";
import GuideDashboard from "@/components/modules/Guide/GuideDashboard";

export default async function GuideDashboardPage() {
    const userInfo = await getUserInfo();

    // Check if user is a guide
    if (userInfo.role !== "GUIDE" || userInfo.guideStatus !== "APPROVED") {
        redirect("/");
    }

    const [statsResponse, guideInfo] = await Promise.all([
        getGuideStats(),
        getGuideInfo(),
    ]);

    const stats = statsResponse.data;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Guide Dashboard</h1>
            <GuideDashboard stats={stats} guideInfo={guideInfo} userInfo={userInfo} />
        </div>
    );
}