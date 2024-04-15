export interface Respuesta {
    idRespuesta: number;
    contenido: string;
  }
  
export  interface Pregunta {
    idPregunta: number;
    titulo: string;
    descripcion: string;
    respuestas: Respuesta[];
  }
  