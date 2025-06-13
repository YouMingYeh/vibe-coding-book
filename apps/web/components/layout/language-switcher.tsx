"use client";

import { useState } from "react";

import { Toggle } from "@workspace/ui/components/toggle";

// This is a placeholder. In a real app, you'd use a library like next-intl or react-i18next
// and get the current locale and supported locales from there.
const locales = [
  { value: "en", label: "English" },
  { value: "tw", label: "繁體中文" },
];

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  // Placeholder for language change logic
  const handleLanguageChange = () => {
    const newLocale = currentLocale === "en" ? "tw" : "en";
    setCurrentLocale(newLocale);
    console.log(`Language changed to: ${newLocale}`);
    // In a real app, you would typically redirect to the new locale path
    // e.g., router.push(pathname, { locale });
  };

  const languageAbbreviation = currentLocale.toUpperCase();

  return (
    <Toggle
      variant="default"
      className="group size-9"
      pressed={currentLocale === "tw"}
      onPressedChange={handleLanguageChange}
      aria-label={`Switch to ${currentLocale === "en" ? "Traditional Chinese" : "English"}`}
    >
      <span className="text-xs font-medium">{languageAbbreviation}</span>
    </Toggle>
  );
}
