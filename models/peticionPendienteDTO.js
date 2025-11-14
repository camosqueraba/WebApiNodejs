import PeticionPendienteDTO from './peticionPendienteDTO.js';
import variablesConfiguracion from '../config/variablesConfiguracion.js';

class PeticionPendienteDTO extends PeticionPendienteDTO {
    constructor(peticion) {
        super(peticion);
        
        this.tiempoMaximoEspera = new Date();
        this.tiempoMaximoEspera.setSeconds(
            this.tiempoMaximoEspera.getSeconds() + 
            variablesConfiguracion.TIEMPO_MAXIMO_ESPERA_SEGUNDOS);
    }
}

export default PeticionPendienteDTO;