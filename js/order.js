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
        rows += '<td class="dt">' + "<img src='"+response[i].photography+"' width='50%' height='50px'>";
        rows += '<td class="dt">' + response[i].os + '</th>';
        rows += '<td class="dt">' + response[i].procesor + '</td>';
        rows += '<td class="dt">' + response[i].memory + '</th>';
        rows += '<td class="dt">' + response[i].hardDrive + '</th>';
        rows += '<td class="dt">' + response[i].description + '</td>';
        rows += '<td class="dt">' + response[i].price + '</td>';
        rows += '<td class="dt">' + "<input id='inputCantidad' type='number' class='form-control text-center' min='1' value='"+response[i].quantity+"'></input>";
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
        }
    });
}

function consultar(idAutoincrementable) {
    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            guardarOrder(response, idAutoincrementable);
        }
    });
}

function guardarOrder(response, idAutoincrementable){
    var items = {};
    var itemsCan = {};
    var idAuto = 1;

    $("#miTablaOrder tr").each(function(e) {
        var itemsProducts = {};
        var itemsCantidad = {};

        var tds = $(this).find(".dt");
        
        itemsProducts.id = idAuto;
        itemsProducts.brand = "";
        itemsProducts.availability = true;
        itemsProducts.quantity = 10;
        itemsProducts.photography = tds.filter(":eq(0)").text();;
        itemsProducts.os = tds.filter(":eq(1)").text();
        itemsProducts.procesor = tds.filter(":eq(2)").text();
        itemsProducts.memory = tds.filter(":eq(3)").text();
        itemsProducts.hardDrive = tds.filter(":eq(4)").text();
        itemsProducts.description = tds.filter(":eq(5)").text();
        itemsProducts.price = parseInt(tds.filter(":eq(6)").text());

        itemsCantidad = parseInt($(this).find("td:eq(7) input[type='number']").val());

        items[idAuto] = itemsProducts;
        itemsCan[idAuto] = itemsCantidad;
        idAuto = idAuto+1;
    });

    let datos = {
        id: idAutoincrementable,
        registerDay: new Date(),
        status: "Pendiente",
        salesMan: response,
        products: items,
        quantities: itemsCan
    }
    var dataToSend = JSON.stringify(datos);
    console.log(dataToSend);
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
                consultar(idAutoincrementable);
            }
        }else{
            confirmar = confirm("¿Estas seguro de enviar la orden?");
            if(confirmar){
                idAutoincrementable = response.length + 1;
                mensaje.text("Orden guardada correctamente: El codigo de tu pedido es " + idAutoincrementable);
                $("#enviarOrder").append(mensaje);
                consultar(idAutoincrementable);
                break;
            }
            break;
        }
    }
}

// function guardarOrder(idAutoincrementable){
//     let datos = {
//         id: idAutoincrementable,
//         registerDay: new Date(),
//         status: "Pendiente"
//         // salesMan: Usuario
//     }
//     var dataToSend = JSON.stringify(datos);
//     $.ajax({
//         datatype: 'json',
//         data: dataToSend,
//         contentType: 'application/json',
//         url: "http://localhost:8080/api/order/new",
//         type: 'POST',
//         success: function(response){
//             console.log(response);
//             $("#ventanaSolicitarOrder").modal("show");
//         },
//         error: function(){
//             alert("Fallo la conexion con la Base de datos");
//         }
//     });
// }

$("#cerrarSesion").click(function(){
    localStorage.clear();
    location.href = "../paginas/index.html";
});


$(document).ready(function(){
    consultarUsuarioPerfil();
    consultarProductos();
});