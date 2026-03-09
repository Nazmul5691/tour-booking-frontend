export default function TourSkeleton() {
    return (
        <section className="container mx-auto px-4 py-10">
            {/* Header Skeleton */}
            <div className="text-center mb-12">
                <div className="h-4 w-40 bg-gray-200 rounded-full mx-auto animate-pulse" />
                <div className="h-10 w-72 bg-gray-200 rounded-full mx-auto mt-3 animate-pulse" />
                <div className="h-4 w-96 bg-gray-200 rounded-full mx-auto mt-4 animate-pulse" />
                <div className="h-4 w-80 bg-gray-200 rounded-full mx-auto mt-2 animate-pulse" />
            </div>

            {/* Cards Skeleton */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
                        <div className="w-full h-64 bg-gray-200 animate-pulse" />
                        <div className="px-6 py-4 space-y-3">
                            <div className="h-6 w-3/4 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-px bg-gray-100 my-2" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-12 w-full bg-gray-200 rounded-full animate-pulse mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}