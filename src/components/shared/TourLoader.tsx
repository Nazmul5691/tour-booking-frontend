"use client";
import { Compass, MapPin, Plane } from "lucide-react";

interface TourLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  variant?: "compass" | "plane" | "map";
}

const SIZE_CLASSES = {
  sm: { container: "w-20 h-20", text: "text-[10px]", icon: 12 },
  md: { container: "w-32 h-32", text: "text-[13.6px]", icon: 16 },
  lg: { container: "w-48 h-48", text: "text-[18px]", icon: 24 },
  xl: { container: "w-64 h-64", text: "text-[24px]", icon: 32 },
} as const;

export default function TourLoader({
  text = "Exploring amazing destinations...",
  size = "md",
  className = "",
  animated = true,
  variant = "compass",
}: TourLoaderProps) {
  const { container, text: textSize, icon: iconSize } = SIZE_CLASSES[size];

  const getIcon = () => {
    switch (variant) {
      case "plane":
        return <Plane className="text-blue-500" size={iconSize} strokeWidth={2} />;
      case "map":
        return <MapPin className="text-blue-500" size={iconSize} strokeWidth={2} />;
      default:
        return <Compass className="text-blue-500" size={iconSize} strokeWidth={2} />;
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 ${className} justify-center min-h-screen bg-linear-to-b from-blue-50 to-white`}
    >
      <style jsx>{`
        @keyframes spin-compass {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes fly-plane {
          0%, 100% {
            transform: translate(0, 0) rotate(-45deg);
          }
          50% {
            transform: translate(10px, -10px) rotate(-45deg);
          }
        }

        @keyframes bounce-pin {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.2;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }

        .spin-compass {
          animation: spin-compass 3s linear infinite;
        }

        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }

        .fly-plane {
          animation: fly-plane 2s ease-in-out infinite;
        }

        .bounce-pin {
          animation: bounce-pin 1.5s ease-in-out infinite;
        }

        .wave {
          animation: wave 2s ease-in-out infinite;
        }

        .fade-in-text {
          animation: fade-in-up 0.5s ease-out 0.5s both;
        }

        .orbit-dot {
          animation: orbit 4s linear infinite;
        }

        /* Disable animations when animated=false */
        .no-animation .spin-compass,
        .no-animation .pulse-ring,
        .no-animation .fly-plane,
        .no-animation .bounce-pin,
        .no-animation .wave,
        .no-animation .fade-in-text,
        .no-animation .orbit-dot {
          animation: none;
        }
      `}</style>

      {/* Main Container */}
      <div
        className={`relative ${container} ${!animated ? "no-animation" : ""}`}
      >
        {/* Outer Pulsing Rings */}
        {animated && (
          <>
            <div className="pulse-ring absolute inset-0 rounded-full border-[3px] border-blue-500" />
            <div className="pulse-ring absolute inset-0 rounded-full border-[3px] border-purple-500" 
                 style={{ animationDelay: "0.5s" }} />
          </>
        )}

        {/* Static Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-gradient-to-r from-blue-500 to-purple-500 shadow-lg" 
             style={{ 
               background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))" 
             }} 
        />

        {/* Inner Container with Icon */}
        <div className="absolute inset-[15%] flex items-center justify-center">
          <div className={
            animated 
              ? variant === "compass" 
                ? "spin-compass" 
                : variant === "plane" 
                  ? "fly-plane" 
                  : "bounce-pin"
              : ""
          }>
            {getIcon()}
          </div>
        </div>

        {/* Orbiting dots for extra effect */}
        {animated && variant === "compass" && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-dot w-2 h-2 bg-blue-500 rounded-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-dot w-2 h-2 bg-purple-500 rounded-full" 
                   style={{ animationDelay: "2s" }} />
            </div>
          </>
        )}

        {/* Wave Effect */}
        {animated && (
          <div className="wave absolute inset-[20%] rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20" />
        )}
      </div>

      {/* Text */}
      {text && (
        <div className="text-center space-y-2">
          <p
            className={`font-semibold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${textSize} ${
              animated ? "fade-in-text" : ""
            }`}
          >
            {text}
          </p>
          {animated && (
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}