import { LucideIcon } from 'lucide-react';

interface Props {
  className:string
  nombreL:string
  icono:LucideIcon
}

export const LabelProfile = ({className,nombreL,icono: Icon}: Props) => {

  return (
      <label className={className}>
        <Icon size={24}/> {nombreL}
      </label>
  )
}