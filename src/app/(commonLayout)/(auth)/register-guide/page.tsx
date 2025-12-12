import GuideRegisterForm from "@/components/guide-registration-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const RegisterGuidePage = () => {
    
    return (
        <>
            <div className="flex min-h-svh w-full  items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-xl pt-10">
                    <Card>
                        <CardHeader>
                            <CardTitle>Apply to became a Guide</CardTitle>
                            <CardDescription>
                                Enter your information below to became a Guide
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <GuideRegisterForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default RegisterGuidePage;
