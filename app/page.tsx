"use client"

import Dashboard from "@/components/Dashboard";
import { Onboarding } from "@/components/Onboarding";
import { useEffect, useState } from "react";

export default function Page() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // For testing: Clear localStorage
/*     localStorage.removeItem('onboardingComplete');
 */    
    const hasCompleted = localStorage.getItem('onboardingComplete');
    if (hasCompleted) {
      setShowOnboarding(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {showOnboarding ? (
        <Onboarding />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

