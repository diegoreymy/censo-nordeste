export interface Persona {
    nombre: string;
    apellido: string;
    cedula: number;
    pasaporteVencido: boolean;
    pasaporteVencimientoProximo: boolean;
    pasaportePrimeraVez: boolean;
    ciudadResidencia: string;
    estadoResidencia: string;
    recibirNotificaciones: boolean;
    email: string;
    telefono: string;
  }