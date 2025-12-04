
// import Specialities from "@/components/modules/Home/Specialties";
// import Steps from "@/components/modules/Home/Steps";
// import Testimonials from "@/components/modules/Home/Testimonials";
// import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import Blogs from "@/components/modules/Home/Blogs";
import Carousel from "@/components/modules/Home/Carosouel";
import DiscoverTours from "@/components/modules/Home/DiscoverTours";
import Faq from "@/components/modules/Home/Faq";
import HeroSection from "@/components/modules/Home/HeroSection";
import Milestone from "@/components/modules/Home/Milestone";
import ParallaxSection from "@/components/modules/Home/ParallaxSection";
import StartAdventure from "@/components/modules/Home/StartAdventure";
import WhyBookWithUs from "@/components/modules/Home/WhyBookWithUs";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        <div className="bg-gray-100">
          <DiscoverTours />
        </div>
        <Carousel />
        <WhyBookWithUs />
        <Milestone />
        <ParallaxSection />
        <Faq />
        <Blogs />
        <StartAdventure />
      </main>
    </>
  );
}
