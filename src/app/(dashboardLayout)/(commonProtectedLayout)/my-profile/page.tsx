export const dynamic = "force-dynamic";
import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  // return <MyProfile userInfo={userInfo} />;
  if (!userInfo) {
        redirect("/login");
    }
    
    return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
