import { BounceLoading } from "respinner";

export default function OnboardingLoader() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-y-2">
      <BounceLoading
        gap={7}
        barWidth={5}
        barHeight={30}
        fill="#fff"
        className="!w-auto !h-auto"
      />
      <p className="text-white text-center font-medium md:text-lg">
        Onboarding...
      </p>
    </div>
  );
}
