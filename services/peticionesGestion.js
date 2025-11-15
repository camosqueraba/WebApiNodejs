import   PeticionPendienteDTO   from '../models/peticionPendienteDTO.js';
import { Mutex } from 'async-mutex';
const mutexColaPeticiones = new Mutex();

export class PeticionesGestion {
   
    static colaPeticiones = [];

    constructor (){
        
    }

    static async EncolarPeticion(peticion)
    {
        try 
        {  
            let peticionPendiente = new PeticionPendienteDTO(peticion);

            await mutexColaPeticiones.runExclusive( async () => {
                
                this.colaPeticiones.push(peticionPendiente);
            });
          
        } 
        catch (error) 
        {
            console.log("Error al encolar la peticion: " + error);
        }
        finally
        {
            DespacharPeticiones();
        }      
    }
    
    AsignarPeticion(peticion, respuesta)
    {
        try 
        {
            
        } 
        catch (error) 
        {
            
        }
    }

    static async DespacharPeticiones(){
        
        try 
        {
            let colaPeticionesTemporal = [];

            await mutexColaPeticiones.runExclusive( async () => {
                while(this.colaPeticiones.length > 0)
                {
                    const peticion = this.colaPeticiones.shift();
                    if (new Date() > peticion.tiempoMaximoEspera)
                    {
                        // Tiempo de espera excedido, manejar el caso
                        console.log(`Peticion ${peticion.id} excedió el tiempo máximo de espera.`);
                    }
                    // Procesar la peticion
                    colaPeticionesTemporal.push(peticion);
                }
            });
        } 
        catch (error) 
        {
            
        }
    }
}

export default PeticionesGestion