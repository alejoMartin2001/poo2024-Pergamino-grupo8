
export const useImage = () => {
  
  const getAvatarEnthusiast = (imageName: string) => {
    return `/src/images/avatars/${imageName ?? "admin-0.png"}`;
  }

  return { 
    getAvatarEnthusiast 
  }
};