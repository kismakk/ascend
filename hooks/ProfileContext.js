import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(require('../components/resources/Cat.jpg'));

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
