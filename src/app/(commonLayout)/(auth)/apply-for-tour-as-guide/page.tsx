/* eslint-disable react/no-unescaped-entities */


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  DollarSign, 
  Languages, 
  Award, 
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Star,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function ApplyGuidePage() {
  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      title: "Earn Good Income",
      description: "Set your own rates and earn competitive income from tours. Average guides earn ৳15,000-30,000 per month.",
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Explore Places",
      description: "Travel to beautiful destinations across Bangladesh while doing what you love.",
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      title: "Build Your Reputation",
      description: "Get reviews and ratings to grow your guide profile and attract more clients.",
    },
    {
      icon: <Languages className="h-6 w-6 text-purple-600" />,
      title: "Meet People",
      description: "Connect with travelers from around the world and share your culture.",
    },
  ];

  const requirements = [
    "At least 1 year of guiding experience",
    "Strong communication skills in English and Bengali",
    "Deep knowledge of local attractions and culture",
    "Ability to handle groups of tourists professionally",
    "Valid identification documents",
    "Passionate about hospitality and tourism",
  ];

  const steps = [
    {
      number: "1",
      title: "Explore Tours",
      description: "Browse through available tours and find ones that match your expertise",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      number: "2",
      title: "Apply to Guide",
      description: "Click on any tour and apply to become a guide for that specific tour",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "3",
      title: "Get Approved",
      description: "Our team reviews your application within 2-3 business days",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      number: "4",
      title: "Start Guiding",
      description: "Once approved, start guiding tours and earning money",
      icon: <Star className="h-5 w-5" />,
    },
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "500+", label: "Active Guides" },
    { icon: <Star className="h-8 w-8" />, value: "4.8/5", label: "Avg Rating" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "₹25K", label: "Avg Monthly" },
    { icon: <Clock className="h-8 w-8" />, value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <Badge className="mb-4 sm:mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs sm:text-sm">
            Join Our Team of Expert Guides
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
            Become a Tour Guide
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white/90">
            Turn your passion for travel and local knowledge into a rewarding career. 
            Guide tourists through Bangladesh's most amazing destinations.
          </p>
          <Link href="/allTours">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-xl">
              Explore Tours & Apply
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3 text-blue-600">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How It Works</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Start your journey as a tour guide in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative border-2 hover:border-blue-500 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="absolute -top-4 left-4 sm:left-6 bg-linear-to-r from-blue-600 to-purple-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-blue-600">{step.icon}</div>
                      <h3 className="font-semibold text-base sm:text-lg">{step.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Become a Guide?</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Enjoy these amazing benefits while sharing your love for travel
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div className="bg-linear-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-full">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-12 sm:mb-16">
          <Card className="border-2 border-blue-200 bg-linear-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                Requirements
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                What we look for in our tour guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0">
          <CardContent className="py-8 sm:py-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-white/90">
              Browse available tours and apply to become a guide for tours that match your expertise
            </p>
            <Link href="/allTours">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-xl">
                Explore All Tours
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}