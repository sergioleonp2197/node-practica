// src/errors/ValidationError.ts
export class ValidationError extends Error {
    status: number;
  
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
      this.status = 400; // Código de estado para errores de validación
    }
  }
  
  // src/errors/NotFoundError.ts
  export class NotFoundError extends Error {
    status: number;
  
    constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
      this.status = 404; // Código de estado para "no encontrado"
    }
  }
  
 
  