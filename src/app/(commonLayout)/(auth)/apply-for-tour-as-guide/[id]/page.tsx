

import ApplyForm from "@/components/apply-for-tour-as-guide-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function TourApplicationForm({ params }: PageProps) {
    const { id } = await params; // ✅ IMPORTANT

    console.log("✅ Current id Received:", id);

    if (!id) {
        return <div className="p-10 text-red-500">Invalid Tour ID</div>;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Apply to be a Guide for this Tour</CardTitle>
                        <CardDescription>
                            Submit your application message for Tour:{" "}
                            <strong>{id}</strong>
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ApplyForm tourId={id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
