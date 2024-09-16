import React, { createContext, useState, useContext } from 'react';

const UserSharedDataContext = createContext();

export const UserSharedDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        healthId: '',
        subscriptionPlan: '',
        paymentStatus: null,
    });

    const updateUserData = (newData) => {
        setUserData(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <UserSharedDataContext.Provider value={ { userData, updateUserData } }>
            { children }
        </UserSharedDataContext.Provider>
    );
};

export const useUserSharedData = () => {
    const context = useContext(UserSharedDataContext);
    if (!context) {
        throw new Error('useUserSharedData must be used within a UserSharedDataProvider');
    }
    return context;
};
