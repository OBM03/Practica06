const cargarTipos = async()=>{
    try{
    //const url = "http://201.140.116.237/services/tipo.php"
    const url = "tipos.json"
    await axios
    .get(url)
    .then((res)=>{
        llenarCombos(res.data);
    })

    .catch((err)=>{
        console.log("Surgió un error en la petición");
        return false;
    });

    }   catch(error){
            console.log("Surgió un error");
            return false;
    }
        return true;
}

function llenarCombos(data) {
    
    for(let item of data){
        document.getElementById("tipo").innerHTML += `<option value="${item.tipo}">${item.descripcion}</option>`
    }

}

const cargarTablaVentas = async()=>{
    //const urlVentas = "http://201.140.116.237/services/ventas.php"
    const urlVentas = "ventas.json";
    try{
        await axios
        .get(urlVentas)
        .then((res)=>{
            dibujarTabla(res.data)
        })
        .catch((err)=>{
            console.log("Surgió un error en la petición");
            return false;
        });

    } catch(error){
        console.log("Surgió un error");
        return false;
    }
    return true;

}

function dibujarTabla(data){
    //Limpiar Tabla
    document.getElementById("cuerpo").innerHTML = ``;
    //Sacar el tipo del combox
    let tipo = document.getElementById("tipo").value;

    for(let item of data){

        if(item.tipo == tipo){
            document.getElementById("cuerpo").innerHTML += `
            <tr>
                <td>${item.folio}</td>
                <td>${item.tipo}</td>
                <td>${item.precio}</td>
                <td>${item.descuento}</td>
                <td>${item.total}</td>
                <td>${item.fechapago}</td>
                <td>${item.giro}</td>
            </tr>`
        }
    }
}

function borrar(){
    document.getElementById("cuerpo").remove();
}

const inicia = async()=>{
    if (await cargarTipos()==true) {
        cargarTablaVentas();
    }else{
        console.log("Surgió un error");
    }
}

inicia();






