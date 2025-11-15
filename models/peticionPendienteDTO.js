import { variablesParametrizacion } from '../config/appSettings.js';
import PeticionDTO from './peticionDTO.js';

class PeticionPendienteDTO extends PeticionDTO {
    constructor(peticion) {
        super(peticion);
        
        this.tiempoMaximoEspera = new Date();
        this.tiempoMaximoEspera.setSeconds(
            this.tiempoMaximoEspera.getSeconds() + 
            variablesParametrizacion.TIEMPO_MAXIMO_ESPERA_SEGUNDOS);
    }
}

export default PeticionPendienteDTO;