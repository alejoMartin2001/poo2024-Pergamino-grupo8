
interface Props {
    nombreButton: string;
    onClick: () => void;
    className: string;
    children?: React.ReactNode; 
}

export const CustomButton = ({ nombreButton, onClick, className, children }: Props) => (
    <button className={className} onClick={onClick}>
        {nombreButton}
        {children}
    </button>
);
