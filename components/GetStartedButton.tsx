"use client";

import { StartSavingCTA } from "./StartSavingCTA";

type Props = {
  className?: string;
  label?: string;
};

export function GetStartedButton({
  className = "",
  label = "Get Started",
}: Props) {
  return <StartSavingCTA className={className} label={label} />;
}
