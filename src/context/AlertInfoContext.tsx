import React, { createContext, ReactNode, useState } from "react";

// 1. Define the shape of the alert info state
interface AlertInfoState {
  heading: string;
  message: string;
  buttonLabel: string;
  linkURL: string;
  errorCode?: string | null;
}

// 2. Define the context value interface
interface AlertInfoContextValue {
  alertInfo: AlertInfoState;
  setAlertInfoHandler: (
    heading: string,
    message: string,
    buttonLabel: string,
    linkURL: string,
    errorCode?: string | null
  ) => void;
}

// 3. Provide default values for AlertInfoState
const defaultAlertInfo: AlertInfoState = {
  heading: "Heading",
  message: "A message goes here",
  buttonLabel: "Go Somewhere",
  linkURL: "/",
  errorCode: null, // setd to null for clarity
};

// 4. Create the Context with a default value
export const AlertInfoContext = createContext<AlertInfoContextValue>({
  alertInfo: defaultAlertInfo,
  setAlertInfoHandler: () => {},
});

// 5. Define props for the provider to accept children
interface AlertInfoProviderProps {
  children: ReactNode;
}

// 6. Create the Provider component
export function AlertInfoProvider({ children }: AlertInfoProviderProps) {
  const [alertInfo, setAlertInfo] = useState<AlertInfoState>(defaultAlertInfo);

  const setAlertInfoHandler = (
    heading: string,
    message: string,
    buttonLabel: string,
    linkURL: string,
    errorCode?: string | null
  ) => {
    setAlertInfo({
      heading,
      message,
      buttonLabel,
      linkURL,
      errorCode: errorCode || null,
    });
  };

  return (
    <AlertInfoContext.Provider value={{ alertInfo, setAlertInfoHandler }}>
      {children}
    </AlertInfoContext.Provider>
  );
}
