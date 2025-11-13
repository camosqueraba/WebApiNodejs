class PeticionDTO {
    constructor(peticion) {
        
        this.peticionId = peticion.peticionId;
        this.archivoId = peticion.archivoId;
        this.usuarioId = peticion.usuarioId;
        this.data = peticion.data;
    }
}

export default PeticionDTO;