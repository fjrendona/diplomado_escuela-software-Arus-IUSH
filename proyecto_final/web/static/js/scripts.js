var formularioEnEdicion = false;
var documentoEncontrado = false;
function limpiarCampos(parameters, isUpdatepage = false) {
    parameters.forEach(element => {document.getElementById(element).value = ""});   
    
    if (isUpdatepage) {
        // Restaura la visibilidad inicial
        document.querySelectorAll('.hide-on-start').forEach(function (element) {
            element.style.display = "none";
        });

        // Restaura la visibilidad de los botones
        document.getElementById("btnActualizar").style.display = "none";
        document.getElementById("btnEliminar").style.display = "none";
        document.getElementById("btnCancelar").style.display = "none";

        // Muestra el botón de buscar
        document.getElementById("btnBuscar").style.display = "block";

        // Restaura el estado del formulario
        formularioEnEdicion = false;
        documentoEncontrado = false;
    }
    
    };
    
function cancelarFormulario(parameters) {
    // Restaura el formulario al estado inicial
    // Habilita los campos "Tipo de Documento" y "Documento de Identidad"
    parameters.forEach(element => {document.getElementById(element).disabled = false});
    limpiarCampos(parameters,true);        
    };  

function validarFormulario(parameters) {
    var camposNoVacios = parameters;    
    for (var i = 0; i < camposNoVacios.length; i++) {
        var campo = document.getElementById(camposNoVacios[i]).value.trim();
        if (campo === '') {
            mostrarError('El campo ' + camposNoVacios[i] + ' no puede estar vacío.');
            return false;
        }
    }
    if (camposNoVacios.includes('password') && camposNoVacios.includes('confirma_password')){
        // Validar Contraseña y Confirmar Contraseña
        var password = document.getElementById("password").value;
        var confirma_password = document.getElementById("confirma_password").value;        

        if (contieneCaracteresNoPermitidos(password) || contieneCaracteresNoPermitidos(confirma_password)) {
            mostrarError("La contraseña no puede contener los caracteres $, %, &, /, *, -, ñ");
            return false;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirma_password) {
            mostrarError("Las contraseñas no coinciden.");
            return false;
        }
        // Validar longitud de la contraseña
        if (password.length < 8) {
            mostrarError("La contraseña debe tener al menos 8 caracteres.");
            return false;
        }
    }             

    return true;
}
function contieneCaracteresNoPermitidos(texto) {
    var caracteresNoPermitidos = /[$%&/,*ñ-]/;
    return caracteresNoPermitidos.test(texto);
}
function mostrarError(mensaje) {            
    var errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '<p>' + mensaje + '</p>';
    $('#errorModal').modal('show');
}
function mostrarOk(mensaje) {            
    var okMessages = document.getElementById('okMessages');
    okMessages.innerHTML = '<p>' + mensaje + '</p>';
    $('#okModal').modal('show');
}
function soloNumeros(event) {            
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
    }
    return true;
}

// Consulta de Profesional

var datosPersonas = [];
function buscarDocumento() {
    

    var documentoInput = document.getElementById("documento");
    var documentoValue = documentoInput.value.trim();

    if (documentoValue === "") {
        mostrarError("El campo documento no puede estar vacío.");
        return;
    }else{
        var datosFicticios = {
        tipoDocumento: "CC",
        documento: "123456789",
        nombreCompleto: "Juan Pérez",
        direccion: "Calle 123",
        fechaNacimiento: "01/01/1990",
        telefono: "1234567890",
        email: "juan.perez@gmail.com",
        cargoProyecto: "Desarrollador Web",
        salario: "$50,000",
        tarjetaProfesional: "123ABC"
    };
    var datosFicticios2 = {
        tipoDocumento: "CE",
        documento: "987654321",
        nombreCompleto: "María González",
        direccion: "Avenida 456",
        fechaNacimiento: "15/03/1985",
        telefono: "9876543210",
        email: "maria.gonzalez@hotmail.com",
        cargoProyecto: "Diseñadora Gráfica",
        salario: "$45,000",
        tarjetaProfesional: "456XYZ"                
        };
    // Agrega los datos a la lista
    datosPersonas.push(datosFicticios, datosFicticios2);

    // Muestra la tabla de resultados y carga los datos
    mostrarResultados(datosFicticios);
    }
    
    
}
// Buscar documento para actualización de profesional
function buscarDocumento(parameters) {
    // Simulación de búsqueda en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real
    var documento = document.getElementById("documento").value;
    if (documento !== "") {
        // Documento encontrado, muestra los campos adicionales y oculta el botón de buscar
        // parameters.forEach(element => {document.getElementById(element).style.display = "block"});
        document.getElementById("nombreCompletoDiv").style.display = "block";
        document.getElementById("direccionDiv").style.display = "block";
        document.getElementById("fechaNacimientoDiv").style.display = "block";
        document.getElementById("telefonoDiv").style.display = "block";
        document.getElementById("emailDiv").style.display = "block";
        document.getElementById("cargoProyectoDiv").style.display = "block";
        document.getElementById("salarioDiv").style.display = "block";
        document.getElementById("tarjetaProfesionalDiv").style.display = "block";
        document.getElementById("btnBuscar").style.display = "none";     

        // Muestra los botones de actualizar y eliminar
        document.getElementById("btnActualizar").style.display = "block";
        document.getElementById("btnEliminar").style.display = "block";
        document.getElementById("btnCancelar").style.display = "block";

        if (parameters.includes("tipoDocumento") && parameters.includes("documento")){
            // Bloquea los campos "Tipo de Documento" y "Documento de Identidad"
            document.getElementById("tipoDocumento").disabled = true;
            document.getElementById("documento").disabled = true;
        }      

        // Actualiza el estado del formulario
        formularioEnEdicion = true;
        documentoEncontrado = true;

        // Aquí puedes cargar los datos encontrados en el formulario para su edición
        // Por ejemplo, puedes hacer una consulta a la base de datos para obtener los datos del documento

        // Luego, estableces esos datos en los campos correspondientes:
        // document.getElementById("nombreCompleto").value = datos.nombreCompleto;
    } else {
        // Muestra un mensaje indicando que el documento no fue encontrado
        mostrarError("Documento no encontrado en la base de datos.");
    }
}

// Actualización de Profesional
function actualizarDatos(parameters) {
    // Actualiza los datos en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real

    // Aquí puedes obtener los valores de los campos y enviarlos a la base de datos para actualizar
    // Por ejemplo, puedes hacer una consulta UPDATE en la base de datos
    // Actualiza el estado del formulario
    // Habilita los campos "Tipo de Documento" y "Documento de Identidad"
    parameters.forEach(element => {document.getElementById(element).disabled=false;});    
    formularioEnEdicion = false;
    documentoEncontrado = true;

    // Puedes mostrar un mensaje de éxito si la actualización fue exitosa
    mostrarOk("Profesional actualizado exitosamente.")
    // Restaura el formulario al estado inicial
    limpiarCampos(parameters,true);
}
// Eliminación de Profesional
function eliminarRegistro(parameters) {
    // Elimina el registro de la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real

    // Aquí puedes obtener el valor del documento y enviarlo a la base de datos para eliminar
    // Por ejemplo, puedes hacer una consulta DELETE en la base de datos

    // Puedes mostrar un mensaje de éxito si la eliminación fue exitosa
    // Habilita los campos "Tipo de Documento" y "Documento de Identidad"
    parameters.forEach(element => {document.getElementById(element).disabled=false;}); 

    // Restaura el formulario al estado inicial
    limpiarCampos(parameters,true);
}

function mostrarResultados() {
    // Muestra la tabla de resultados
    document.getElementById('tablaResultados').classList.remove('hide-on-start');

    // Rellena la tabla con los datos
    var resultadosBody = document.getElementById('resultadosBody');
    resultadosBody.innerHTML = '';

    // Itera sobre la lista de datosPersonas
    for (var i = 0; i < datosPersonas.length; i++) {
        var datos = datosPersonas[i];

        // Crea una fila para cada persona
        var fila = `
            <tr>
                <td>${datos.tipoDocumento}</td>
                <td>${datos.documento}</td>
                <td>${datos.nombreCompleto}</td>
                <td>${datos.direccion}</td>
                <td>${datos.fechaNacimiento}</td>
                <td>${datos.telefono}</td>
                <td>${datos.email}</td>
                <td>${datos.cargoProyecto}</td>
                <td>${datos.salario}</td>
                <td>${datos.tarjetaProfesional}</td>                    
            </tr>
        `;

        // Agrega la fila a la tabla
        resultadosBody.innerHTML += fila;
    }
}
