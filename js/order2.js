// PERFIL ==============================================================================================

function consultarUsuarioPerfil() {
    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaPerfilAsesor").empty();
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

    $("#miTablaPerfilAsesor").append(rows);
}










$("#cerrarSesion").click(function(){
    localStorage.clear();
    location.href = "../paginas/index.html";
});

window.onload = consultarUsuarioPerfil();