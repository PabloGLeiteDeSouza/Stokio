import React from "react";
import { StorageProvider } from "./storage";

interface ApplicationProviderProps {
    children: React.ReactNode;
}

const ApplicationProvider: React.FC<ApplicationProviderProps> = ({children}) => {
    return (
        <StorageProvider>
            {children}
        </StorageProvider>
    )
}

export default ApplicationProvider;