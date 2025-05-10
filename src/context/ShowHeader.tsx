import React, { createContext, ReactNode, useState } from "react";

// 1. Define the shape of the alert info state
interface SettingsState {
  showHeader: boolean;
  role: string;
}

// 2. Define the context value interface
interface ShowHeaderSettingsContextValue {
  settings: SettingsState;
  setSettingsHandler: (showHeader: boolean, role: string) => void;
}

// 3. Provide default values for ShowHeaderSettingsState
const defaultShowHeaderSettings: SettingsState = {
  showHeader: false,
  role: "Pending",
};

// 4. Create the Context with a default value
export const ShowHeaderSettingsContext =
  createContext<ShowHeaderSettingsContextValue>({
    settings: defaultShowHeaderSettings,
    setSettingsHandler: () => {},
  });

// 5. Define props for the provider to accept children
interface ShowHeaderSettingsProviderProps {
  children: ReactNode;
}

// 6. Create the Provider component
export function ShowHeaderSettingsProvider({
  children,
}: ShowHeaderSettingsProviderProps) {
  const [settings, setSettings] = useState<SettingsState>(
    defaultShowHeaderSettings
  );

  const setSettingsHandler = (showHeader: boolean, role: string) => {
    setSettings({
      showHeader,
      role,
    });
  };

  return (
    <ShowHeaderSettingsContext.Provider
      value={{ settings, setSettingsHandler }}
    >
      {children}
    </ShowHeaderSettingsContext.Provider>
  );
}
