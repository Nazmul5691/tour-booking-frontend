
import GetAvailableTours from "@/components/modules/Guide/GetAvailableTours";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function AvailableToursPage() {
    const guideInfo = await getUserInfo();
    console.log("guideinfo",guideInfo);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Available Tours</h1>
            <GetAvailableTours guideInfo={guideInfo} />
        </div>
    );
}