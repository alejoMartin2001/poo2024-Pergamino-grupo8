
interface Props {
    type?: "submit" | "button" | undefined;
    nombreButton: string;
    onClick: () => void;
    className: string | undefined;
    children?: React.ReactNode; 
}

export const ButtonGenerico = ({type, nombreButton, onClick, className, children }: Props) => (
    <button type = {type} className={className} onClick={onClick}>
        {nombreButton}
        {children}
    </button>
);
