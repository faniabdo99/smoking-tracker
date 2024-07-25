import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface SmokingTrackerContextType {
    refresh: boolean;
    triggerRefresh: () => void;
}

// Provide a default value
const defaultValue: SmokingTrackerContextType = {
    refresh: false,
    triggerRefresh: () => {},
};

// Create the context with the specified type
export const SmokingTrackerContext = createContext<SmokingTrackerContextType>(defaultValue);

// Define the props for the provider component
interface SmokingTrackerProviderProps {
    children: ReactNode;
}

// Create the provider component
export const SmokingTrackerProvider: React.FC<SmokingTrackerProviderProps> = ({ children }) => {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => {
        setRefresh(prev => !prev);
    };

    return (
        <SmokingTrackerContext.Provider value={{ refresh, triggerRefresh }}>
            {children}
        </SmokingTrackerContext.Provider>
    );
};
