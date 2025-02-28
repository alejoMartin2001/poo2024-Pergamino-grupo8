import { Dropdown } from "@shared/components/Dropdown";

export const ConfigUser = () => {

  // Opciones del Dropdown de Configuración
  const opcionesConfiguracion = [
    { opcion: "Cambiar nombre", action: "Cargar nombre"},
    { opcion: "Cambiar apellido", action: "Cargar apellido"},
    { opcion: "Cambiar mail", action: "Cargar mail"},
    { opcion: "Cambiar contraseña", action: "Cargar contraseña"},
    { opcion: "Editar perfil", action: "Cargar perfil"},
    { opcion: "Cambiar bio" , action: "Cargar bio"},
    { opcion: "Volver", action: ""},
  ];

  return (
      <Dropdown listaOpciones={opcionesConfiguracion} />
  );
};
