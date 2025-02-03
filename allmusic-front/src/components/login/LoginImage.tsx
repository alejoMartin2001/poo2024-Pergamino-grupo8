
interface Props {
  image: string;
};

export const LoginImage = ({ image }: Props) => {
  return (
    <img className="h-auto w-[700px] drop-shadow-lg" src={image} />
  );
};