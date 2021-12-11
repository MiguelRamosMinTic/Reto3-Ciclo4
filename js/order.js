// PERFIL ==============================================================================================

function consultarUsuarioPerfil() {
    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaPerfil").empty();
            mostrarTablaPerfil(response);
            console.log(response);
        }
    });
}

function mostrarTablaPerfil(response) {
    let rows = '<tr>';
        rows += '<th scope="row">' + response.identification + '</th>';
        rows += '<td>' + response.name + '</td>';
        rows += '<td>' + response.email + '</td>';
        switch(response.type){
            case 'COORD':
                rows += '<td>' + "Coordinador de zona" + '</td>';
                break;
            case 'ADM':
                rows += '<td>' + "Administrador" + '</td>';
                break;
            case 'ASE':
                rows += '<td>' + "Asesor Comercial" + '</td>';
                break;
            default:
                rows += '<td>' + "Perfil no definido" + '</td>';
                break;
        }
        rows += '<td>' + response.zone + '</td>';
        rows += '</tr>';

    $("#miTablaPerfil").append(rows);
}

// ORDENES DE PEDIDO ==============================================================================================

function consultarProductos(){
    $.ajax({
        url: "http://localhost:8080/api/clone/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaOrder").empty();
            mostrarTablaOrder(response);
            console.log(response);
        }
    });
}

function mostrarTablaOrder(response) {
    let rows = '<tr>';
    for(i = 0; i < response.length; i++){
        rows += '<td>' + "<img src='"+response[i].photography+"' width='50%' height='50px'>";
        rows += '<th>' + response[i].os + '</th>';
        rows += '<td>' + response[i].procesor + '</td>';
        rows += '<th>' + response[i].memory + '</th>';
        rows += '<th>' + response[i].hardDrive + '</th>';
        rows += '<td>' + response[i].description + '</td>';
        rows += '<td>' + response[i].price + '</td>';
        rows += '<td>' + "<input type='number' class='form-control text-center' min='1' value='"+response[i].quantity+"'></input>";
        rows += '</tr>';
    }
    $("#miTablaOrder").append(rows);
}

function consultarOrder(){
    $.ajax({
        url: "http://localhost:8080/api/order/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            mensajePedido(response);
            console.log(response);
        }
    });
}

function mensajePedido(response){
    $("#enviarOrder").empty();
    let mensaje = $("<p>");
    console.log(response.length);
    for(i=0; i<=response.length; i++){
        if(response.length == 0){
            let confirmar = confirm("¿Estas seguro de enviar la orden?");
            if(confirmar){
                var idAutoincrementable = 1;
                mensaje.text("Orden guardada correctamente: El codigo de tu pedido es " + idAutoincrementable);
                $("#enviarOrder").append(mensaje);
                guardarOrder(idAutoincrementable);
            }
        }else{
            confirmar = confirm("¿Estas seguro de enviar la orden?");
            if(confirmar){
                idAutoincrementable = response.length + 1;
                mensaje.text("Orden guardada correctamente: El codigo de tu pedido es " + idAutoincrementable);
                $("#enviarOrder").append(mensaje);
                guardarOrder(idAutoincrementable, null);
                break;
            }
            break;
        }
    }
}

function guardarOrder(idAutoincrementable){
    var id = localStorage.getItem("idUser");
    let datos = {
        id: idAutoincrementable,
        registerDay: new Date(),
        status: "Pendiente"
        // salesMan: Usuario
    }
    var dataToSend = JSON.stringify(datos);
    $.ajax({
        datatype: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://localhost:8080/api/order/new",
        type: 'POST',
        success: function(response){
            console.log(response);
            $("#ventanaSolicitarOrder").modal("show");
        },
        error: function(){
            alert("Fallo la conexion con la Base de datos");
        }
    });
}

$("#cerrarSesion").click(function(){
    localStorage.clear();
    location.href = "../paginas/index.html";
});


$(document).ready(function(){
    consultarUsuarioPerfil();
    consultarProductos();
});