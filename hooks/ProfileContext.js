import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(require('../components/resources/Cat.jpg'));
  const [imageId, setImageId] = useState(null);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage, imageId, setImageId }}>
      {children}
    </ProfileContext.Provider>
  );
};
