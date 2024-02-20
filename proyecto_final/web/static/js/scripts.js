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
function buscarDocumentoProf() {
    

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
function actualizarDatos(parameters, event) {
    // Actualiza los datos en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real

    // Aquí puedes obtener los valores de los campos y enviarlos a la base de datos para actualizar
    // Por ejemplo, puedes hacer una consulta UPDATE en la base de datos
    // Actualiza el estado del formulario
    // Habilita los campos 
    event.preventDefault();
    var formularioValido = validarFormulario(parameters);
    if (formularioValido) {
        // Envía el formulario manualmente
        var form = event.target.form;
        form.submit();
    }
    parameters.forEach(element => {document.getElementById(element).disabled=false;});    
    formularioEnEdicion = false;
    documentoEncontrado = true;  

    // Puedes mostrar un mensaje de éxito si la actualización fue exitosa
    mostrarOk("Registro actualizado exitosamente.")
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

    mostrarOk("Registro eliminado exitosamente.")

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
function mostrarResultadosProyecto() {
    // Muestra la tabla de resultados
    document.getElementById('tablaResultados').classList.remove('hide-on-start');

    // Rellena la tabla con los datos
    var resultadosBody = document.getElementById('resultadosBody');
    resultadosBody.innerHTML = '';

    // Itera sobre la lista de datosPersonas
    for (var i = 0; i < datosProyecto.length; i++) {
        var datos = datosProyecto[i];

        // Crea una fila para cada persona
        var fila = `
            <tr>
                <td>${datos.idproyecto}</td>
                <td>${datos.nombreProyecto}</td>
                <td>${datos.fechaInicio}</td>
                <td>${datos.fechaFinalizacion}</td>
                <td>${datos.ciudad}</td>                                   
            </tr>
        `;

        // Agrega la fila a la tabla
        resultadosBody.innerHTML += fila;
    }
}
//  Busqueda de Identificador de Contrato (Actualización de contrato)
function buscarIdContrato() {
    // Simulación de búsqueda en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real
    var idcontrato = document.getElementById("idcontrato").value;
    if (idcontrato !== "") {
        // Documento encontrado, muestra los campos adicionales y oculta el botón de buscar
        document.getElementById("fechaInicioDiv").style.display = "block";
        document.getElementById("fechaFinalizacionDiv").style.display = "block";
        document.getElementById("valorContratoDiv").style.display = "block";
        document.getElementById("objetoContratoDiv").style.display = "block";
        document.getElementById("profesionalACargoDiv").style.display = "block";
        document.getElementById("proyectoDiv").style.display = "block";                

        // Muestra los botones de actualizar y eliminar
        document.getElementById("btnActualizar").style.display = "block";
        document.getElementById("btnEliminar").style.display = "block";
        document.getElementById("btnCancelar").style.display = "block";

        // Bloquea los campos "Tipo de Documento" y "Documento de Identidad"                
        document.getElementById("idcontrato").disabled = true;

        // Actualiza el estado del formulario
        formularioEnEdicion = true;
        documentoEncontrado = true;

        // Aquí puedes cargar los datos encontrados en el formulario para su edición
        // Por ejemplo, puedes hacer una consulta a la base de datos para obtener los datos del documento

        // Luego, estableces esos datos en los campos correspondientes:
        // document.getElementById("nombreCompleto").value = datos.nombreCompleto;
    } else {
        // Muestra un mensaje indicando que el documento no fue encontrado
        mostrarError("Identificador no encontrado en la base de datos.");
    }
}

//Llenar lista de profesionales
// window.onload = function(){
//     const profe = document.getElementById("profesionalACargo");
//     dame_profesionales().then((pro)=>{
//         pro.map((pro) =>{
//             const option = document.createElement('option');
//             option.value = pro.id;
//             option.text = pro.nombre;
//             profe.appendChild(option);
//     })
//     })  
// }

async function dame_profesionales(){
    const API = "http://127.0.0.1:5002/profesional";
    try{
    const response = await fetch(API);
    console.log(response.json);
    return response.json();
    }catch(error){
    console.error("Error en fetch", error);
    }
}

// Buscar actividad (Actualización de Actividades)
function buscarActividad() {
    // Simulación de búsqueda en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real
    var idactividad = document.getElementById("idActividad").value;
    if (idactividad !== "") {
        // Documento encontrado, muestra los campos adicionales y oculta el botón de buscar
        document.getElementById("nombreDiv").style.display = "block"
        document.getElementById("propositoDiv").style.display = "block";
        document.getElementById("fechaEjecucionDiv").style.display = "block";
        document.getElementById("proyectoDiv").style.display = "block";       

        // Muestra los botones de actualizar y eliminar
        document.getElementById("btnActualizar").style.display = "block";
        document.getElementById("btnEliminar").style.display = "block";
        document.getElementById("btnCancelar").style.display = "block";
        document.getElementById("idActividad").disabled = true;

        // Actualiza el estado del formulario
        formularioEnEdicion = true;
        documentoEncontrado = true;

        // Aquí puedes cargar los datos encontrados en el formulario para su edición
        // Por ejemplo, puedes hacer una consulta a la base de datos para obtener los datos del documento

        // Luego, estableces esos datos en los campos correspondientes:
        // document.getElementById("nombreCompleto").value = datos.nombreCompleto;
    } else {
        // Muestra un mensaje indicando que el documento no fue encontrado
        mostrarError("Identificador no encontrado en la base de datos.");
    }
}
// Mostrar campos paara Consulta Proyecto
function mostrarCampos() {
    var tipoConsulta = document.getElementById('tipoConsulta').value;

    // Ocultar todos los campos
    document.getElementById('divValor').classList.add('hidden');
    document.getElementById('divFechaInicio').classList.add('hidden');
    document.getElementById('divDocumento').classList.add('hidden');

    // Mostrar el campo correspondiente
    if (tipoConsulta === 'valor') {
        document.getElementById('divValor').classList.remove('hidden');
    } else if (tipoConsulta === 'fechaInicio') {
        document.getElementById('divFechaInicio').classList.remove('hidden');
    } else if (tipoConsulta === 'profesional') {
        document.getElementById('divDocumento').classList.remove('hidden');
    }
}

async function dame_proyectos(){
    const API = "http://127.0.0.1:5003/proyecto";
    try{
    const response = await fetch(API);
    console.log(response.json);
    return response.json();
    }catch(error){
    console.error("Error en fetch", error);
    }
}

// Buscar Proyectos (Actualización de Proyectos)
var datosProyecto = [];
function buscarProyecto() {
    // Simulación de búsqueda en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real
    var idcontrato = document.getElementById("idproyecto").value;
    if (idcontrato !== "") {
        // Documento encontrado, muestra los campos adicionales y oculta el botón de buscar
        document.getElementById("nombreProyectoDiv").style.display = "block";
        document.getElementById("fechaInicioDiv").style.display = "block";
        document.getElementById("fechaFinalizacionDiv").style.display = "block";
        document.getElementById("ciudadDiv").style.display = "block";

        // Muestra los botones de actualizar y eliminar
        document.getElementById("btnActualizar").style.display = "block";
        document.getElementById("btnEliminar").style.display = "block";
        document.getElementById("btnCancelar").style.display = "block";

        // Bloquea los campos "Tipo de Documento" y "Documento de Identidad"                
        document.getElementById("idproyecto").disabled = true;

        // Actualiza el estado del formulario
        formularioEnEdicion = true;
        documentoEncontrado = true;

        // Aquí puedes cargar los datos encontrados en el formulario para su edición
        // Por ejemplo, puedes hacer una consulta a la base de datos para obtener los datos del documento

        // Luego, estableces esos datos en los campos correspondientes:
        // document.getElementById("nombreCompleto").value = datos.nombreCompleto;
    } else {
        // Muestra un mensaje indicando que el documento no fue encontrado
        mostrarError("Identificador no encontrado en la base de datos.");
    }
}

function buscarProyectoAct() {    

    // Obtenemos el tipo de consulta seleccionado
    var tipoConsulta = document.getElementById("tipoConsulta").value;    

    // Verificamos si se seleccionó un tipo de consulta
    if (!tipoConsulta) {
        mostrarError("Debes seleccionar un tipo de consulta.");
        return;
    }

    // Obtenemos los valores de los campos según el tipo de consulta
    var valor = document.getElementById("valor").value.trim();    
    var fechaInicio = document.getElementById("fechaInicio").value.trim();    
    var documento = document.getElementById("documento").value.trim();

    // Realizamos la búsqueda según el tipo de consulta
    if (tipoConsulta === "fechaInicio") {
        var datos = {
            idproyecto: "111",
            nombreProyecto: "XXXXXX",
            fechaInicio: "15/03/2024",
            fechaFinalizacion: "15/05/2024",
            ciudad: "Albania"
            };
        datosProyecto.push(datos);
        mostrarResultadosProyecto(datos);
    } else if (tipoConsulta === "profesional") {
        var datos = {
            idproyecto: "111",
            nombreProyecto: "XXXXXX",
            fechaInicio: "15/03/2024",
            fechaFinalizacion: "15/05/2024",
            ciudad: "Albania"
            };
       
        datosProyecto.push(datos);
        mostrarResultadosProyecto(datos);
    } else if (tipoConsulta === "valor") {
        // Realizar búsqueda por valor (datos ficticios)
        var datos = {
            idproyecto: "111",
            nombreProyecto: "XXXXXX",
            fechaInicio: "15/03/2024",
            fechaFinalizacion: "15/05/2024",
            ciudad: "Albania"
            };
        datosProyecto.push(datos);
        mostrarResultadosProyecto(datos);
    }
}

//Llenar listas desplegables
window.onload = function(){
    const combo = document.getElementById("ciudad");
    dame_municipio().then((m)=>{
        m.map((m) =>{
        const option = document.createElement('option');
        option.value = m.id;
        option.text = m.nombre;
        combo.appendChild(option);
    })
    })
    
    const profe = document.getElementById("profesionalACargo");
    dame_profesionales().then((pro)=>{
        pro.map((pro) =>{
            const option = document.createElement('option');
            option.value = pro.id;
            option.text = pro.nombre;
            profe.appendChild(option);
    })
    })

    const proye = document.getElementById("proyecto");
    dame_proyectos().then((proy)=>{
        proy.map((proy) =>{
            const option = document.createElement('option');
            option.value = proy.id;
            option.text = proy.nombre;
            proye.appendChild(option);
    })
    })
}

async function dame_data(){
    const API = " http://127.0.0.1:5000/departamento";
    try{
    const response = await fetch(API);
    console.log(response.json);
    return response.json();
    }catch(error){
    console.error("Error en fetch", error);
    }
}

function seleccionar_departamento(){
    console.log("Ingreso onchange")
    const componente = document.getElementById("departamento")
    const index = componente.selectedIndex;
    const dep = componente.options[index];
    
    const mun_com = document.getElementById("ciudad")
    mun_com.innerHTML = "";
    dame_municipio(departamento.value).then((resultado) => {
    resultado.map((m) =>{
        const option = document.createElement('option');
        option.value = m.id;
        option.text = m.nombre;
        mun_com.appendChild(option);
    })
    });
}

async function dame_municipio(id){
    const API = " http://127.0.0.1:5001/municipio/" + id;
    try{
    const response = await fetch(API);
    console.log(response.json);
    return response.json();
    }catch(error){
    console.error("Error en fetch", error);
    }
}
    
function buscarDocumentoUser() {
    // Simulación de búsqueda en la base de datos (SQLite)
    // Puedes personalizar esta parte según tu implementación real
    var documento = document.getElementById("documento").value;
    if (documento !== "") {
        // Documento encontrado, muestra los campos adicionales y oculta el botón de buscar
        document.getElementById("nombreCompletoDiv").style.display = "block";
        document.getElementById("direccionDiv").style.display = "block";
        document.getElementById("fechaNacimientoDiv").style.display = "block";
        document.getElementById("telefonoDiv").style.display = "block";
        document.getElementById("emailDiv").style.display = "block";
        document.getElementById("userDiv").style.display = "block";
        document.getElementById("passwordDiv").style.display = "block";
        document.getElementById("confirmDiv").style.display = "block";
        document.getElementById("rolDiv").style.display = "block";
        document.getElementById("btnBuscar").style.display = "none";

        // Muestra los botones de actualizar y eliminar
        document.getElementById("btnActualizar").style.display = "block";
        document.getElementById("btnEliminar").style.display = "block";
        document.getElementById("btnCancelar").style.display = "block";

        // Bloquea los campos "Documento de Identidad"                
        document.getElementById("documento").disabled = true;

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