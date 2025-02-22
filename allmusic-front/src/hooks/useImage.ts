import { useAuth } from 'src/contexts/AuthProvider';

interface Props {
    setAvatar: (url:string) => void
}

export const useImage = ({setAvatar}:Props) => {
    const {user} = useAuth();
    const imgAvatar = () => {
        for(let i=0; i<9; i++){
            if(`admin-${i}.png` == user?.profilePicture){
                setAvatar(`src/images/avatars/admin-${i}.png`);
            }
        }
    }

    return { imgAvatar }
}