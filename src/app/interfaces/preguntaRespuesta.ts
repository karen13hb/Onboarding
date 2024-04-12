export interface Pregunta {
    idPregunta: number;
    pregunta: string;
    respuestas: Respuesta[];
  }
  
 export interface Respuesta {
    idRespuesta: number;
    nombreRespuesta: string;
  }
  