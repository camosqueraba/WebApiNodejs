import PeticionesGestion from "../services/peticionesGestion.js";
import PeticionDTO from "../models/peticionDTO.js";    

export class PeticionesController {
    constructor (){

    }

    async procesarPeticion(peticion, respuesta)
    {
        try
        {
            var peticionDTO = new PeticionDTO(peticion.body);
            
            await PeticionesGestion.EncolarPeticion(peticionDTO);
            respuesta.json({msg: 'respuesta peticion post desde controller'});

        }
        catch (error) 
        {
            console.log("Error al procesar la peticion: " + error);
            respuesta.status(500).json({msg: 'Error al procesar la peticion' + error});
        }        
    }    
}

export default PeticionesController 