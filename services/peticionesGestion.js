import { Mutex } from 'async-mutex';
const mutex = new Mutex();

export class PeticionesGestion {
   
    constructor (){
        this.colaPeticiones = [];
    }

    static async EncolarPeticion(peticion)
    {
        try 
        {
            const release = await mutex.acquire(); // Acquire the lock
            
            let peticionPendiente = new PeticionPendienteDTO(peticion);

            this.colaPeticiones.push(peticionPendiente);
        } 
        catch (error) 
        {
            console.log("Error al encolar la peticion: " + error);
        } 
        finally 
        {
            release(); // Release the lock
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
            const release = await mutex.acquire();
            while(this.colaPeticiones.length > 0){
                const peticion = this.colaPeticiones.shift();
                // Procesar la peticion
            }
        } 
        catch (error) 
        {
            
        }
    }
}

export default PeticionesGestion