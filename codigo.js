//Partes escondidas por defecto al cargar el sitio

//NOTA: PE quiere decir "Para Estudiante", "PP" quiere decir "Para Profesor", "Global" es para todos

//MENÚ PARA ESTUDIANTE, botones con funciones wrapper
document.querySelector("#btnBuscarEjsPE").addEventListener("click",fBuscarEjsPE);
document.querySelector("#btnEntregasPE").addEventListener("click",fEntregasPE);
document.querySelector("#btnEjsResueltosPE").addEventListener("click",fEjsResueltosPE);
document.querySelector("#btnStatsPE").addEventListener("click",fStatsPE);

//MENÚ PARA PROFESOR, botones con funciones wrapper
document.querySelector("#btnNivelacionPP").addEventListener("click",fNivelarPP);
document.querySelector("#btnDevolucionesPP").addEventListener("click",fDevolucionesPP);
document.querySelector("#btnEjsNuevosPP").addEventListener("click",fNuevosEjsPP);
document.querySelector("#btnStatsPP").addEventListener("click",fStatsPP);

//LOGIN, PARA TODOS
document.querySelector("#btnLoginHTML").addEventListener("click",userLoginHTML);

//TERMINAR SESIÓN, PARA TODOS
document.querySelector("#terminarSesionHTML").addEventListener("click",terminarSesion);

//IR AL FORMULARIO DE REGISTRO, PARA TODOS
document.querySelector("#btnRegistroHTML").addEventListener("click",fRegistroGlobal);

//FUNCIONALIDAD DEL FORMULARIO DE REGISTRO DE USUARIOS
//Cambiar el formulario dependiendo de si se selecciona "estudiante" o "profesor" como tipo de usuario
document.querySelector("#tipoDeUser").addEventListener("change", fTipoDeUsuarioRegistro);

//LLAMAR A LA FUNCIÓN QUE REGISTRA NUEVOS USUARIOS
document.querySelector("#btnCompletarRegistro").addEventListener("click",fRegistrarse);

//SUBIR UN EJERCICIO, PARA PROFESOR
document.querySelector("#btnSubirNuevoEjHTML").addEventListener("click",subirEjercicioHTMLPP);

//SELECCIONAR IMAGEN PARA SUBIR UN EJERCICIO, PARA PROFESOR
document.querySelector("#btnsubirImagenPlantearEj").addEventListener("click",clickEnFileImg); //click en el botón invisible para activar la selección de imagen
document.querySelector("#subirImagenPlantearEjHTML").addEventListener("change",subirImg); //update en la página luego de seleccionar imagen

//SUBIR NIVEL A ESTUDIANTE, PARA PROFESOR
document.querySelector("#listaEstudiantesNivelHTML").addEventListener("change", mostrarNivelEstudiantePP); //si se selecciona un estudiante, se cambian los niveles mostrados
//aplicar el cambio de nivel
document.querySelector("#btnCambiarNivelHTML").addEventListener("click", subirNivelEstudiantePP);

//BUSCAR EJERCICIOS, PARA ESTUDIANTE
document.querySelector("#btnBuscarEjs").addEventListener("click", buscarEjerciciosIncompletosPE);

//Para Todos (Global), elementos ocultos por defecto
hideAndShow("#registroGlobal", 0); //menú registrarse
hideAndShow("#blogRecibidorGlobal", 0); //blog para recibir gente a la página
hideAndShow("#terminarSesionHTML", 0); //botón de terminar sesión
//Para Estudiantes, elementos ocultos por defecto
hideAndShow("#statsPE", 0); //parte donde el estudiante verá sus estadísticas
hideAndShow("#ejerciciosResueltosPE", 0); //parte donde el estudiante verá sus ejercicios resueltos
//hideAndShow("#devolucionPE", 0); //parte donde el estudiante verá la devolución de un ejercicio
hideAndShow("#entregaPE", 0); //parte donde el estudiante entregará un ejercicio
hideAndShow("#ejerciciosBusquedaPE", 0); //parte donde el estudiante entregará un ejercicio
//Para Profesores, elementos ocultos por defecto
hideAndShow("#nivelarEstudiantePP", 0); //profesor modificará el nivel de un estudiante
hideAndShow("#plantearEjercicioPP", 0); //profesor planteará nuevos ejercicios
hideAndShow("#devolverEjPP", 0); //profesor hará devolución de ejercicios
hideAndShow("#statsPP", 0); //profesor verá estadísticas de los alumnos
//MENÚ, elementos ocultos por defecto
hideAndShow("#loginMenuEsperando", 0); //esperando login
hideAndShow("#menuPE", 0); //menú estudiante
hideAndShow("#menuPP", 0); //menú profesor

//VARIABLE GLOBAL PARA GUARDAR EL USUARIO LOGUEADO
let usuarioLogueado = null;

//MOSTRAR SECCIONES PARA ESTUDIANTE, funciones wrapper
function fBuscarEjsPE() {
    hideEverythingBut("#ejerciciosBusquedaPE");
    //la limpieza de búsquedas se hará al terminar sesión, de modo que al volver a la búsqueda, se podrá ver la última búsqueda realiza y sus resultados
}

function fEntregasPE() {
    hideEverythingBut("#entregaPE");
}

function fEjsResueltosPE() {
    hideEverythingBut("#ejerciciosResueltosPE");
    listarEjerciciosCompletosPE();
}

function fStatsPE() {
    hideEverythingBut("#statsPE"); //mostramos página de estadísticas
    statsEstudiante(usuarioLogueado.id); //actualizamos las estadísticas del estudiante
    mostrarEstadisticasPE(usuarioLogueado.id, "#statsPE"); //actualizamos el HTML
}

//MOSTRAR SECCIONES PARA PROFESOR, funciones wrapper
function fNivelarPP() {
    document.querySelector("#nivelActualEstudianteHTML").innerHTML=""; //limpiamos HTML que muestra nivel, en caso de que hubiese quedado algo mostrado previamente
    hideEverythingBut("#nivelarEstudiantePP"); //mostramos la sección de nivelación de estudiantes, ocultamos el resto de secciones
    hideAndShow("#levelUpEstudianteHTML", 0); //escondemos el select de nivel
    listaEstudiantesANivelarPP(); //cargamos la lista de estudiantes 
}

function fDevolucionesPP() {
    hideEverythingBut("#devolverEjPP");
    devolucionPP();
}

function fNuevosEjsPP() {
    hideEverythingBut("#plantearEjercicioPP");
    //Limpiamos lo que pudo haber quedado de ejercicios no subidos o anteriores
    document.querySelector("#tituloPlantearEjHTML").value = ""; //vaciamos valor del input de título
    document.querySelector("#descripcionPlantearEjHTML").value = ""; //vaciamos valor del input de letra
    document.querySelector("#nivelPlantearEjHTML").value = "elegir"; //valor del select para el nivel del ejercicio, "elegir" por defecto
    document.querySelector("#imgPlantearEjHTML").innerHTML = ""; //vaciamos la imagen cargada, de haberla
    document.querySelector("#erroresPlantearEjHTML").innerHTML = ""; //vaciamos resultado
}

function fStatsPP() {
    hideEverythingBut("#statsPP");
    crearStatsPPHTML();
    listaEstudiantesStats(); //llenar select
    document.querySelector("#alumnosStats").addEventListener("change", mostrarStatsEstudiantePP); //funcionalidad select
}

//MOSTRAR REGISTRO, función wrapper
function fRegistroGlobal() {
    hideEverythingBut("#registroGlobal"); //mostramos el formulario de registro y escondemos el resto del contenido
    //hideAndShow("#divRegistroHTML", 0); //botón de registro escondido //nota: botón visible porque está bueno recargar la página de inmediato también
    hideAndShow("#elegirProfesor", 0); //botón de elegir profesor escondido
    hideAndShow("#codigoProfesor", 0); //código para registrar profesores escondido
    //nos aseguramos que todos los items del registro estén en blanco o en su posición original
    document.querySelector("#crearPassHTML").value = ""; //vaciamos input
    document.querySelector("#repetirPassHTML").value = ""; //vaciamos input
    document.querySelector("#usernameHTML").value = ""; //vaciamos input
    document.querySelector("#nombreCompletoHTML").value = ""; //vaciamos input
    document.querySelector("#tipoDeUser").value="elegir"; //forzamos el valor default de "tipoDeUser"
    document.querySelector("#codigoProfesorInput").value=""; //vaciar input de código para el registro de profesores
    document.querySelector("#elegirProfesor").innerHTML = "" //si ya habían profesores en este select, los vaciamos para poder cargar una nueva lista sin repetir nombres y con posibles nombres actualizados
    document.querySelector("#elegirProfesor").innerHTML += fLlenarProfesoresRegistro(); //llenamos lista de profesores
    document.querySelector("#resultadoRegistro").innerHTML=""; //vaciamos errores o mensajes de registro anteriores
}

//FUNCIONALIDADES DE PÁGINA DE REGISTRO, funciones wrapper

//ocultar/mostrar el select de elegir profesor
function fTipoDeUsuarioRegistro(){
    //guardamos el valor del select "tipo de user" en la variable "userType" para resumir código luego
    let userType = document.querySelector("#tipoDeUser").value;

    //si en el drop-down seleccionamos que nos vamos a registrar como "alumno"
    if (userType === "estudiante")
    {
        hideAndShow("#codigoProfesor", 0);
        hideAndShow("#elegirProfesor", 1, true); //mostramos el select para elegir profesor
    }
    else if (userType === "profesor") //sino
    {
        hideAndShow("#elegirProfesor", 0); //ocultamos el select para elegir profesor
        hideAndShow("#codigoProfesor", 1, true); //mostramos el campo para poner el código para registrarse como profe, CÓDIGO: YOTENGOELPODER
    }
    else
    {
        console.log("Dejá de meter mano con la consola, estás rompiendo todo!");
    }
}

//mostrar lista de profesores disponibles para que el alumno escoja
function fLlenarProfesoresRegistro(){
    //hacemos un for que recorra el array profesores (que guarda los objetos de cada profesor) y liste sus nombres en <option></option> que se añadirán al html
    let opciones = `<option hidden value="elegir">Elegir profesor</option>`; //string que guardará todas las opciones de profesor, valor inicial dice "Elegir profesor"
    for (i=0; i < profesores.length; i++)
    {
        opciones += `<option value="${profesores[i].id}">${profesores[i].nombre}</option>`;
    }
    return opciones;
}

//registrarse, función wrapper
function fRegistrarse(){
    let contraseña = document.querySelector("#crearPassHTML").value; //tomamos input crearPassHTML, guardamos en variable cowntraseña
    let contraseñaRepetida = document.querySelector("#repetirPassHTML").value; //tomamos input repetirPassHTML, guardamos en variable contraseñaRepetida
    let nombreDeUsuario = document.querySelector("#usernameHTML").value; //tomamos input usernameHTML, guardamos en variable nombreDeUsuario
    let nombreCompleto = document.querySelector("#nombreCompletoHTML").value; //tomamos input nombreCompletoHTML, guardamos en variable nombreCompleto
    let rolEscogido = document.querySelector("#tipoDeUser").value; //tomamos input tipoDeUser, guardamos en variable rolEscogido
    let profEscogido = document.querySelector("#elegirProfesor").value; //tomamos input 
    let codigoProf = document.querySelector("#codigoProfesorInput").value;

    //pasamos al HTML el resultado de la función completarRegistro
    resultado = completarRegistro(contraseña, contraseñaRepetida, nombreDeUsuario, nombreCompleto, rolEscogido, parseInt(profEscogido), codigoProf); //parseInt prof escogido para que guarde el valor como int y no como string
    document.querySelector("#resultadoRegistro").innerHTML = resultado;

    //Si el registro es exitoso
    if (resultado === `REGISTRO COMPLETADO ${rolEscogido} ${nombreCompleto}`)
    {
        //recargamos lista de profesores, si el usuario registrado es un profesor
        if (rolEscogido === "profesor")
        {
            document.querySelector("#elegirProfesor").innerHTML = "" //si ya habían profesores en este select, los vaciamos para poder cargar una nueva lista sin repetir nombres y con posibles nombres actualizados
            document.querySelector("#elegirProfesor").innerHTML += fLlenarProfesoresRegistro(); //llenamos lista de profesores
        }

        //limpiamos todos los campos para un nuevo registro
        document.querySelector("#crearPassHTML").value="";
        document.querySelector("#repetirPassHTML").value=""; 
        document.querySelector("#usernameHTML").value="";
        document.querySelector("#nombreCompletoHTML").value="";
        document.querySelector("#tipoDeUser").value="elegir"; 
        document.querySelector("#elegirProfesor").value="elegir";
        document.querySelector("#codigoProfesorInput").value="";
        hideAndShow("#elegirProfesor", 0);
        hideAndShow("#codigoProfesor", 0);
    }
}

//LOGUEAR USUARIO
function userLoginHTML(){
    let usuario = document.querySelector("#loginUsernameHTML").value;
    let contraseña = document.querySelector("#loginPasswordHTML").value;
    let errorLogin = document.querySelector("#loginError");
    let usuarioALoguear = validarLogin(usuario, contraseña); //variable local

    if (usuarioALoguear !== "USUARIO O CONTRASEÑA INCORRECTOS") //si hay un objeto y no un error
    {
        if (usuarioALoguear instanceof Estudiante) //si el user es alumno
        {
            //INSTANCEOF DOCUMENTACIÓN/FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/instanceof
            alguienLogged();
            hideAndShow("#menuPE", 1); //menú estudiante mostrado
            hideAndShow("#menuPP", 0); //menú profesor oculto
            document.querySelector("#loggedInUser").innerHTML = `${usuarioALoguear.nombre}, ${usuarioALoguear.rol}`; //mostramos el nombre y rol del usuario logueado, debajo del menú 
        }
        else //si el user logueado no es alumno (es profesor)
        {
            alguienLogged();
            hideAndShow("#menuPP", 1); //menú profesor mostrado
            hideAndShow("#menuPE", 0); //menú estudiante oculto
            document.querySelector("#loggedInUser").innerHTML = `${usuarioALoguear.nombre}, ${usuarioALoguear.rol}`; //mostramos el nombre y rol del usuario logueado, debajo del menú  
            //actualizamos los alumnos de ese profesor
            asignarEstudiantes(usuarioALoguear.id); 
        }
        usuarioLogueado = usuarioALoguear; //actualizamos el valor del usuario logueado, que es una variable global
    }
    else //Sino
    {
        //Mostramos el error
        errorLogin.innerHTML = "USUARIO O CONTRASEÑA INCORRECTOS";
    }
}

function terminarSesion(){
    //ocultamos botón de terminar sesión
    hideAndShow("#terminarSesionHTML", 0); //botón de terminar sesión ocultado
    //deslogueamos al usuario (ocultamos todo el contenido que el usuario podía ver, volviendo al estado inicial de la página)
    nadieLogged(); //llamamos a la función nadieLogged, para ocultar: nombre de la persona logueada, menú de estudiante o profesor
    //vaciamos los inputs de nombre de usuario y contraseña
    document.querySelector("#loginUsernameHTML").value = "";
    document.querySelector("#loginPasswordHTML").value = "";
    //vaciamos el error de logueo, en caso de que se haya mostrado:
    document.querySelector("#loginError").innerHTML = "";
    document.querySelector("#ejerciciosEncontradosHTML").innerHTML = ""; //Para Estudiante, limpiamos búsquedas anteriores
    document.querySelector("#buscarEjsInputHTML").value = ""; //Para Estudiante, limpiamos búsquedas anteriores
    document.querySelector("#entregaPE").innerHTML="<h3>Ningún ejercicio seleccionado.</h3><h3>Por favor busque un ejercicio para trabajar en esta sección.</h3>"; //Para Estudiante, limpiamos cualquier ejercicio seleccionado para trabajar
    vaciarAlumnosProfesor(); //en caso de que el usuario a desloguear sea un profesor, vaciamos su lista de alumnos primero para ahorrar recursos (la lista se reconstruirá la próxima vez que el profesor haga login)
    usuarioLogueado = null; //vaciamos el usuario logueado
}

//MENÚ ANTES DE LOGUEARSE
function nadieLogged() {
    hideEverythingBut("#blogRecibidorGlobal"); //blog para recibir gente a la página
    hideAndShow("#loginMenuEsperando", 1); //esperando login
    hideAndShow("#divRegistroHTML", 1); //botón de registro
    hideAndShow("#loggedInUser", 0);
    hideAndShow("#menuPE", 0); //menú estudiante oculto
    hideAndShow("#menuPP", 0); //menú profesor oculto
    console.log(`Nadie logueado`);
}

//MOSTRAR MENÚ, PARA ESTUDIANTE
function alguienLogged() {
    hideEverythingBut("#blogRecibidorGlobal"); //empezamos mostrando el blog y ocultando todo lo demás
    hideAndShow("#loggedInUser", 1); //persona logueada
    hideAndShow("#terminarSesionHTML", 1); //mostrar botón de terminar sesión
    hideAndShow("#loginMenuEsperando", 0); //esperando login
    hideAndShow("#divRegistroHTML", 0); //botón de registro escondido
}

//SUBIR EJERCICIOS, PARA PROFESOR
function subirEjercicioHTMLPP(){
    let tituloEj = document.querySelector("#tituloPlantearEjHTML").value; //valor del input de título
    let letraEj = document.querySelector("#descripcionPlantearEjHTML").value; //valor del input de letra
    let nivelEj = document.querySelector("#nivelPlantearEjHTML").value; //valor del select para el nivel del ejercicio
    let imgEj = document.querySelector("#imgPlantearEjHTML").innerHTML; //seleccionamos la imagen cargada, de haberla

    let resultado = crearEjercicioPP(tituloEj, letraEj, nivelEj, imgEj); //guardamos el retorno de la función crearEjercicioPP en la variable resultado

    if (resultado !== "OK") //si resultado es distinto de "OK", hubo errores, entonces
    {
        document.querySelector("#erroresPlantearEjHTML").innerHTML = resultado; //mostramos errores
    }
    else //sino
    {
        document.querySelector("#erroresPlantearEjHTML").innerHTML = `¡Ejercicio ${tituloEj} para nivel ${nivelEj} creado!`; //confirmamosal usuario que se creó el ejercicio
        ejsParaAlumnosDelProfesor(usuarioLogueado.id);//asignamos el ejercicio sólo a los alumnos del profesor actualmente logueado, para optimizar recursos
        //y LIMPIAMOS para que se pueda crear otro ejercicio
        document.querySelector("#tituloPlantearEjHTML").value = ""; //valor del input de título
        document.querySelector("#descripcionPlantearEjHTML").value = ""; //valor del input de letra
        document.querySelector("#nivelPlantearEjHTML").value = "elegir"; //valor del select para el nivel del ejercicio, "elegir" por defecto
        document.querySelector("#imgPlantearEjHTML").innerHTML = ""; //seleccionamos la imagen cargada, de haberla
    }
}

//simula un click para nuestro botón invisible de seleccionar imagen
function clickEnFileImg(){
    document.querySelector("#subirImagenPlantearEjHTML").click();
}

function subirImg(){
    let imgEj = document.querySelector("#subirImagenPlantearEjHTML").value;
    //mostramos la imagen en el html

    document.querySelector("#imgPlantearEjHTML").innerHTML = `<img src="imagenes/${ imgEj.split("fakepath\\")[1] }" width=500>`;
    //"imagenes/${imgEj.split("fakepath")[1]}" el split es lo que nos da la imagen dentro de la carpeta imagenes (luego de /imagenes), por ejemplo: imagenes/ej3.jpg, el path será algo así como C:\fakepath\img.ej3, lo que hacemos es dividir eso en 2 partes: "C:\fakepath" y "\img.ej3", descartamos el fakepath al seleccionar la segunda parte de esta cadena de texto con [1] (index 1), no sin antes agregar la carpeta imagenes/ para obtener imagenes/ej3.png por ejemplo
}


//para la sección de nivelar estudiantes, Para Profesor
function listaEstudiantesANivelarPP(){
    let opciones = `<option hidden value="elegir">Seleccionar alumno</option>`; //variable para opciones que mostraremos en el html de nivelar estudiantes, la primera opción sólo dirá "Seleccionar alumno", estará hidden para que no se pueda seleccionar, value por defecto es "elegir"
    //for para recorrer los alumnos del profesor logueado
    for (let i = 0; i < usuarioLogueado.alumnos.length; i++)
    {
        //agregamos alumno con html para que sea una opción válida para el select; el value será el objeto en sí mismo, y el nombre aparecerá como opción a seleccionar
        opciones += `<option value="${usuarioLogueado.alumnos[i].id}">${ usuarioLogueado.alumnos[i].nombre }</option>`
    }
    document.querySelector("#listaEstudiantesNivelHTML").innerHTML=opciones; //mostramos las opciones de estudiantes
}

//para la sección de nivelar estudiantes, Para Profesor
function mostrarNivelEstudiantePP()
{
    let estudianteSeleccionado = document.querySelector("#listaEstudiantesNivelHTML").value; //leemos el valor escogido del select
    let estudianteObjeto = null; //para almacenar el estudiante seleccionado
    let opciones = `<option hidden value="elegir">Aumentar nivel a</option>`; //HTML que mostrará las opciones disponibles para aumentar el nivel del estudiante

    if (estudianteSeleccionado !== "elegir") //si se seleccionó un estudiante
    {   
        //como el value del select se guarda como texto, lo parseamos a entero antes de restarle 1, y usamos eso como index del array estudiantes para apuntar al estudiante correcto
        estudianteObjeto = estudiantes[parseInt(estudianteSeleccionado)-1]
        //mostramos el nivel actual del estudiante
        document.querySelector("#nivelActualEstudianteHTML").innerHTML=`Nivel actual: ${estudianteObjeto.nivel}`;
    
        switch (estudianteObjeto.nivel){
            case "inicial":
                hideAndShow("#levelUpEstudianteHTML", 1, true); //nos aseguramos que el select de nivel esté visible
                opciones += `<option value="intermedio">Intermedio</option>`; //el valor de "opciones" será "intermedio"
                break;
            case "intermedio":
                hideAndShow("#levelUpEstudianteHTML", 1, true); //nos aseguramos que el select de nivel esté visible
                opciones += `<option value="avanzado">Avanzado</option>`; //el valor de "opciones" será "avanzado"
                break;
            case "avanzado":
                //agregamos un aviso de que el estudiante ya se encuentra en nivel máximo
                document.querySelector("#nivelActualEstudianteHTML").innerHTML+="<br><br>El estudiante ya se encuentra en el nivel máximo."
                //ocultamos el select de nivel
                hideAndShow("#levelUpEstudianteHTML", 0);
                break;
        }
        //mostramos los niveles a los que el estudiante puede subir
        document.querySelector("#levelUpEstudianteHTML").innerHTML=opciones; //mostramos opciones dentro del select (de haberlas)
    }
}

//para la sección de nivelar estudiantes, Para Profesor
function subirNivelEstudiantePP()
{
    let estudianteSeleccionado = document.querySelector("#listaEstudiantesNivelHTML").value; //leemos el valor del estudiante escogido del select
    estudianteSeleccionado = estudiantes[estudianteSeleccionado-1]; //guardamos el objeto estudiante como estudiante seleccionado
    let nivelSeleccionado = document.querySelector("#levelUpEstudianteHTML").value; //leemos el valor de nivel escogido del select

    //si se seleccionó un nivel
    if (nivelSeleccionado !== "elegir")
    {
        //advertimos de que este cambio es permanente
        //definimos "confirmacion" para guardar el resultado del confirm (que será un bool)
        let confirmacion = confirm(`Este cambio es permanente.
        ¿Está seguro que quiere subir el nivel de ${estudianteSeleccionado.nombre} a ${nivelSeleccionado}?`);

        //si el confirm es true
        if (confirmacion)
        {
            //subimos el nivel
            estudianteSeleccionado.nivel = nivelSeleccionado;
            //mostramos alert confirmando que el nivel fue subido
            alert(`¡${estudianteSeleccionado.nombre} ahora es un estudiante ${estudianteSeleccionado.nivel}!`);
            //actualizamos la página para mostrar el nivel actualizado del estudiante
            mostrarNivelEstudiantePP();
            //actualizamos los ejercicios que los alumnos de ese profesor tendrán
            ejsParaAlumnosDelProfesor(usuarioLogueado.id);
        }
    }
}
//FUENTES para el alert alert() y confirm()
//https://www.w3schools.com/jsref/met_win_confirm.asp y https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm
//https://stackoverflow.com/questions/9334636/how-to-create-a-dialog-with-yes-and-no-options


//Función para crear el HTML preview de un listado de un array de ejercicios (ej: preview para un array de ejercicios incompletos por el alumno, o completos, o ejercicios con devolución del profesor, etc)
function previewEjercicios(_ejerciciosArray, _id, _completitud){

    let ejerciciosMostrados = ``; //variable string donde se guardará el HTML para mostrar el título y descripción de los ejercicios encontrados
    let ejerciciosMostradosIDs = []; //array para acumular los ID de cada ejercicio mostrado

    for (let i = 0; i < _ejerciciosArray.length; i++)
    {
        let ejercicioMostrado = usuarioLogueado.ejercicios[_ejerciciosArray[i]-1]; //ejercicio iterado de los ejercicios del usuario logueado (alumno)
        ejerciciosMostrados += `<a class="ejerciciosTitulosBuscadosHTML" id="ejercicio${ejercicioMostrado.id}"><h3>${ejercicioMostrado.titulo} - ${ejercicioMostrado.nivel} - ${profesores[ejercicioMostrado.profesor-1].nombre}</h3></a>${ejercicioMostrado.letra}`;
        //si el ejercicio tiene una devolución
        if (ejercicioMostrado.devolucion !== "" && ejercicioMostrado.devolucion !== undefined)
        {
            ejerciciosMostrados += "<br><strong>CON DEVOLUCIÓN</strong>";
        }
        //le damos el mismo número de ID al link del ejercicio mostrado que el ejercicio mostrado, el link del ejercicio tendrá ID "ejercicioN", para facilitar su ubicación, luego mostramos el título, nivel y profesor en el mismo h3 y la descripción debajo
        ejerciciosMostradosIDs.push(`ejercicio${ejercicioMostrado.id}`); //guardamos ID en array
    }

    //Mostramos el HTML generado en ejerciciosMostrados, enviándolo al div "ejerciciosEncontradosHTML"
    document.querySelector(_id).innerHTML=ejerciciosMostrados;

    //Si se quiere el HTML de ejercicios incompletos, para que el alumno complete
    if (_completitud === false)
    {
        //damos funcionalidad a cada elemento mostrado; al hacer click en el link, se llamará a la función mostrarEjIncompletoBuscadoPE que ocultará todo y mostrará el ejercicio en cuestión
        for (let i=0; i < ejerciciosMostradosIDs.length; i++)
        {
            document.querySelector(`#${ejerciciosMostradosIDs[i]}`).addEventListener("click", mostrarEjIncompletoBuscadoPE);
        }
        return console.log ("Se devolvieron los ejercicios incompletos.");
    }
    //Si se quiere el HTML de ejercicios completos
    else if (_completitud === true)
    {
        //damos funcionalidad a cada elemento mostrado; al hacer click en el link, se llamará a la función mostrarEjCompletoBuscadoPE que ocultará todo y mostrará el ejercicio en cuestión
        for (let i=0; i < ejerciciosMostradosIDs.length; i++)
        {
            document.querySelector(`#${ejerciciosMostradosIDs[i]}`).addEventListener("click", mostrarEjCompletoBuscadoPE); //funcionalidad de cada link de ejercicio completo
        }
        return console.log ("Se devolvieron los ejercicios completos.");
    }
    return console.log ("Error en la función previewEjercicios.");
}

function buscarEjerciciosIncompletosPE(){

    let busqueda = document.querySelector("#buscarEjsInputHTML").value //tomamos el value string del input del buscador

    let ejerciciosIncompletos = buscarEjsPorTextoPE(busqueda, false); //hacemos una búsqueda del texto guardado en "busqueda" dentro de los ejercicios incompletos asignados al alumno, guardamos el resultado en la variable "ejerciciosIncompletos"
    //Nota: si "#buscarEjsInputHTML" está vacío, va a traer todos los ejericios incompletos, lo cuál es una ventaja para el estudiante que quiera buscar todos los ejercicios que necesita completar
    //console.log(ejerciciosIncompletos); //debug en consola (ver ejercicios devueltos)

    //llamamos a la función para crear el HTML para la lista de ejercicios filtrados por buscarEjsPorTextoPE, que están dentro del array ejerciciosIncompletos
    previewEjercicios(ejerciciosIncompletos, "#ejerciciosEncontradosHTML", false); //esta función también llamará a la función mostrarEjIncompletoBuscadoPE al finalizar, para mostrar el HTML
}

//Para la sección de Buscar Ejercicios, Entrar en un ejercicio buscado, Para estudiantes
function mostrarEjIncompletoBuscadoPE()
{
    let ejercicio = ``; //Guardaremos el HTML para el ejercicio
    let ejercicioLlamado = this.id; //Guardamos el ID del elemento que llamó esta función, FUENTE: http://127.0.0.1:5500/pagina/html/index.html
    hideEverythingBut("#entregaPE"); //ocultamos todo excepto por la sección donde mostraremos el ejercicio
    ejercicioLlamado = ejercicioLlamado.split("ejercicio")[1]; //recortamos la palabra "ejercicio" del ID y nos quedamos sólo con la parte numérica, que corresponderá con el ID de alguno de los ejercicios que el estudiante tiene dentro de su array de ejercicios
    //HTML que muestra: título del ejercicio, descripción del ejercicio, imagen, botón invisible para subir audio, botón para procesar audio y botón para completar entrega
    ejercicio = `<h3>${usuarioLogueado.ejercicios[ejercicioLlamado-1].titulo}</h3> ${usuarioLogueado.ejercicios[ejercicioLlamado-1].letra} <br><br> ${usuarioLogueado.ejercicios[ejercicioLlamado-1].imagen} <br> <input type="file" accept="audio/*" hidden id="subirAudioHiddenHTML"> <br> <input type="button" value="Subir audio" id="btnSubirAudio"> <br><br> <div id="audioPorSubirHTML"></div> <br> <input type="button" value="Completar entrega" id="btnCompletarEntrega">`;
    //actualizamos la página con el HTML creado
    document.querySelector("#entregaPE").innerHTML = ejercicio;
    //damos funcionalidad al botón de Subir Audio, llamando a la función que hace click en el botón invisible que sube el audio
    document.querySelector("#btnSubirAudio").addEventListener("click",clickEnSubirAudio);
    //damos funcionalidad al botón invisible, que llama a subirAudio cuando es clickeado
    document.querySelector("#subirAudioHiddenHTML").addEventListener("change",subirAudio);
    //damos funcionalidad al botón de "completar entrega", adjuntamos el audio al ejercicio del alumno
    document.querySelector("#btnCompletarEntrega").addEventListener("click",entregarEjPE);
    //función interna para completar la entrega, porque de esta forma podemos llamar estas acciones con el botón de "completar entrega", y al mismo tiempo, seguir utilizando el mismo valor de ejercicioLlamado sin tener que pasarlo a una variable global
    function entregarEjPE(){
        if (document.querySelector("#audioPorSubirHTML").innerHTML !== "") //si hay un archivo subido
        {
            //subimos el audio al ejercicio
            usuarioLogueado.ejercicios[ejercicioLlamado-1].audio = document.querySelector("#audioPorSubirHTML").innerHTML;
            //actualizamos el valor Completo del ejercicio para pasarlo a "true", marcándolo como completo
            usuarioLogueado.ejercicios[ejercicioLlamado-1].completo = true;
            //deshabilitamos los botones de subir audio y completar entrega
            document.querySelector("#btnSubirAudio").disabled=true
            document.querySelector("#subirAudioHiddenHTML").disabled=true
            document.querySelector("#btnCompletarEntrega").disabled=true;
            //mostramos cartel de que el ejercicio fue entregado correctamente
            document.querySelector("#entregaPE").innerHTML+="<h3>¡Entrega completada!</h3>";
            //limpiamos los ejercicios buscados
            document.querySelector("#ejerciciosEncontradosHTML").innerHTML = ""; //Para Estudiante, limpiamos búsquedas anteriores
            document.querySelector("#buscarEjsInputHTML").value = ""; //Para Estudiante, limpiamos búsquedas anteriores
        }
        else //sino, mostramos un alert con un error
        {
            alert("No se completó la entrega porque no se detectó ningún archivo subido.");
        }
    }
}

//simula un click para nuestro botón invisible de seleccionar imagen
function clickEnSubirAudio(){
    document.querySelector("#subirAudioHiddenHTML").click();
}

function subirAudio(){
    let audioEj = document.querySelector("#subirAudioHiddenHTML").value;
    //mostramos el audio en el HTML
    document.querySelector("#audioPorSubirHTML").innerHTML = `<audio controls> <source src="audios/${ audioEj.split("fakepath\\")[1] }"> </audio>`;
    //"audios/${audioEj.split("fakepath")[1]}" el split es lo que nos da es el audio dentro de la carpeta audios (luego de /imagenes), por ejemplo: imagenes/ej3.jpg, el path será algo así como C:\fakepath\img.ej3, lo que hacemos es dividir eso en 2 partes: "C:\fakepath" y "\img.ej3", descartamos el fakepath al seleccionar la segunda parte de esta cadena de texto con [1] (index 1), no sin antes agregar la carpeta imagenes/ para obtener imagenes/ej3.png por ejemplo
}

function listarEjerciciosCompletosPE(){

    let ejerciciosCompletados = buscarEjsPorCompletitudPE(true); //buscamos los ejercicios completos y los guardamos en el array ejerciciosCompletados

    //Si no hay ejercicios completados
    if (ejerciciosCompletados.length === 0){
        //mostramos el siguiente mensaje
        document.querySelector("#ejerciciosResueltosPE").innerHTML=`<h3>Acá podrás tus ejercicios resueltos y sus devoluciones.</h3><h3>Ningún ejercicio resuelto de momento.</h3>`;
    }
    else
    {
        //llamamos a la función para crear el HTML para la lista de ejercicios filtrados por buscarEjsPorTextoPE, que están dentro del array ejerciciosIncompletos
        previewEjercicios(ejerciciosCompletados, "#ejerciciosResueltosPE", true); //esta función también llamará a la función mostrarEjCompletoBuscadoPE al finalizar, para mostrar el HTML
    }
}

function mostrarEjCompletoBuscadoPE(){
    let ejercicio = ``; //Guardaremos el HTML para el ejercicio
    let ejercicioLlamado = this.id; //Guardamos el ID del elemento que llamó esta función, FUENTE: http://127.0.0.1:5500/pagina/html/index.html
    hideEverythingBut("#entregaPE"); //ocultamos todo excepto por la sección donde mostraremos el ejercicio
    ejercicioLlamado = ejercicioLlamado.split("ejercicio")[1]; //recortamos la palabra "ejercicio" del ID y nos quedamos sólo con la parte numérica, que corresponderá con el ID de alguno de los ejercicios que el estudiante tiene dentro de su array de ejercicios
    //si el ejercicio tiene devolución de un profesor
    if (usuarioLogueado.ejercicios[ejercicioLlamado-1].devolucion !== undefined && usuarioLogueado.ejercicios[ejercicioLlamado-1].devolucion !== "")
    {
        //mostramos la devolución del ejercicio
        ejercicio = `<h3>Devolución de ${usuarioLogueado.ejercicios[ejercicioLlamado-1].titulo} - ${usuarioLogueado.ejercicios[ejercicioLlamado-1].nivel}</h3> ${usuarioLogueado.ejercicios[ejercicioLlamado-1].devolucion}<br><br>Profesor: ${profesores[usuarioLogueado.profesor -1].nombre}<br><hr>`;
    }
    //HTML que muestra: título del ejercicio, descripción del ejercicio, imagen y botón para descargar audio
    //este HTML también contiene un link invisible, con argumento "download", con un split para obtener la ruta del archivo de audio desde el .audio del objeto ejercicio; al hacer click en este link oculto, se descarga el archivo en cuestión
    ejercicio += `<h3>${usuarioLogueado.ejercicios[ejercicioLlamado-1].titulo}</h3> ${usuarioLogueado.ejercicios[ejercicioLlamado-1].letra} <br><br> ${usuarioLogueado.ejercicios[ejercicioLlamado-1].imagen} <br><br><div id="audioSubidoHTML"></div><br> <input type="button" value="Descargar audio" id="btnDescargarAudio"> <a href='${usuarioLogueado.ejercicios[ejercicioLlamado-1].audio.split('"')[3]}' hidden id="archivoSubidoHidden" download></a>`;
    //actualizamos la página con el HTML creado
    document.querySelector("#entregaPE").innerHTML = ejercicio;
    //mostramos el audio previamente subido de forma web
    document.querySelector("#audioSubidoHTML").innerHTML = usuarioLogueado.ejercicios[ejercicioLlamado-1].audio;
    //damos funcionalidad al botón de Descargar Audio, llamando a la función que hace click en el botón invisible que sube el audio
    document.querySelector("#btnDescargarAudio").addEventListener("click",clickEnDescargarAudio);
}

function clickEnDescargarAudio(){
    //hacemos click en el link invisible que tiene la descarga
    document.querySelector("#archivoSubidoHidden").click();
}

//para la sección de hacer devoluciones, Para Profesor
function estudiantesEsperandoDevolucionPP(){
    let opciones = `<option hidden value="elegir">Elegir alumno</option>`; //variable para opciones que mostraremos en la lista
    //for para recorrer los alumnos del profesor logueado
    for (let i = 0; i < usuarioLogueado.alumnos.length; i++)
    {
        //for para recorrer los ejercicios del alumno iterado, hasta encontrar al menos uno que esté completo pero sin devolución
        for (let b = 0; b < usuarioLogueado.alumnos[i].ejercicios.length; b++)
        {
            //si el alumno tiene ejercicios completos pero sin devolución
            if (usuarioLogueado.alumnos[i].ejercicios[b].completo === true && usuarioLogueado.alumnos[i].ejercicios[b].devolucion === undefined || usuarioLogueado.alumnos[i].ejercicios[b].devolucion === "")
            {
                //agregamos alumno con html para que sea una opción válida para el select; el value será el objeto en sí mismo, y el nombre aparecerá como opción a seleccionar
                opciones += `<option value="${usuarioLogueado.alumnos[i].id}">${ usuarioLogueado.alumnos[i].nombre }</option>`
                break; //rompemos el for interno (b)
            }
        }
    }
    return opciones; //mostramos las opciones de estudiantes
}

function ejerciciosEsperandoDevolucionPP()
{
    hideAndShow("#ejsADevolverPPHTML", 1, true); //mostramos el select
    document.querySelector("#ejsADevolverPPHTML").innerHTML = ""; //vaciamos las opciones previas
    document.querySelector("#ejercicioMostradoADevolverPPHTML").innerHTML=""; //vaciamos contenido previo de existir
    let opciones = `<option hidden value="elegir">Elegir ejercicio</option>`; //variable para opciones que mostraremos en la lista
    let alumnoID = document.querySelector("#alumnosQueEntregaronEjsPPHTML").value; //id del alumno seleccionado

    if (alumnoID === "elegir")
    {
        return alert("Debe elegir un ejercicio.");
    }

    //for para recorrer los ejercicios del alumno seleccionado
    for (let b = 0; b < estudiantes[alumnoID -1].ejercicios.length; b++)
    {
        if (estudiantes[alumnoID -1].ejercicios[b].completo === true && estudiantes[alumnoID -1].ejercicios[b].devolucion === undefined || estudiantes[alumnoID -1].ejercicios[b].devolucion === "")
        {
            opciones += `<option value="${estudiantes[alumnoID -1].ejercicios[b].id}">${estudiantes[alumnoID -1].ejercicios[b].titulo}</option>`
        }
    }
    
    document.querySelector("#ejsADevolverPPHTML").innerHTML += opciones;
}

function mostrarEjADevolverPP(){
    let ejercicioID = document.querySelector("#ejsADevolverPPHTML").value; //guardamos valor del ejercicio
    let alumnoID = document.querySelector("#alumnosQueEntregaronEjsPPHTML").value; //alumno seleccionado

    if (ejercicioID !== "elegir") //si ejercicioID no es "elegir"
    {
        //actualizamos HTML de ejercicioMostradoADevolverPPHTML
        document.querySelector("#ejercicioMostradoADevolverPPHTML").innerHTML=`<h3>${estudiantes[alumnoID -1].ejercicios[ejercicioID -1].titulo}</h3>${estudiantes[alumnoID -1].ejercicios[ejercicioID -1].letra}<br><br>${estudiantes[alumnoID -1].ejercicios[ejercicioID -1].audio}<br><br><input type="button" value="Descargar audio" id="btnDescargarAudioEjResueltoPP"><br><br><strong>Devolución:</strong><br><textarea id="textoDeDevolucionProfesor"></textarea><br><br><input type="button" value="Confirmar devolución" id="btnConfirmarDevolucionPP"> <a href='${estudiantes[alumnoID -1].ejercicios[ejercicioID -1].audio.split('"')[3]}' hidden id="archivoSubidoHiddenDevolucion" download></a>`;
        //añadimos funcionalidad al botón de descargar el archivo
        document.querySelector("#btnDescargarAudioEjResueltoPP").addEventListener("click", audioDescargaDevolucionPP);
        //funcionalidad al botón de confirmar devolución
        document.querySelector("#btnConfirmarDevolucionPP").addEventListener("click",subirDevolucionPP);
    }
}

function audioDescargaDevolucionPP(){
    //hacemos click en el link invisible que tiene la descarga
    document.querySelector("#archivoSubidoHiddenDevolucion").click();
}

//DEVOLUCIÓN, PROFESOR
function devolucionPP(){
    //escondemos ejsADevolverPPHTML
    hideAndShow("#ejsADevolverPPHTML", 0);
    document.querySelector("#ejercicioMostradoADevolverPPHTML").innerHTML=""; //limpiamos contenido previo de existir
    document.querySelector("#ejsADevolverPPHTML").innerHTML=""; //vaciamos las opciones previas

    //select de estudiante, sólo se mostrarán los estudiantes con ejercicios que requieren devolución
    document.querySelector("#alumnosQueEntregaronEjsPPHTML").innerHTML=""; //vaciamos las opciones previas
    let opcionesEstudiantes = estudiantesEsperandoDevolucionPP(); //corremos la función estudiantesEsperandoDevolucionPP y guardamos su resultado en opcionesEstudiantes
    document.querySelector("#alumnosQueEntregaronEjsPPHTML").innerHTML+=opcionesEstudiantes; //actualizamos el select para escoger estudiante con las opciones de opcionesEstudiantes

    //select de ejercicios, sólo se mostrarán los ejercicios que requieren devolución
    document.querySelector("#alumnosQueEntregaronEjsPPHTML").addEventListener("change",ejerciciosEsperandoDevolucionPP); //al elegir un estudiante, actualizamos el select de ejercicios

    //mostrar ejercicios al seleccionar uno del select
    document.querySelector("#ejsADevolverPPHTML").addEventListener("change",mostrarEjADevolverPP);
}

function subirDevolucionPP(){
    let ejercicioID = document.querySelector("#ejsADevolverPPHTML").value; //guardamos valor del ejercicio
    let alumnoID = document.querySelector("#alumnosQueEntregaronEjsPPHTML").value; //alumno seleccionado
    let devolucionTxt = document.querySelector("#textoDeDevolucionProfesor").value;

    if (devolucionTxt.length < 20)
    {
        alert("La devolución debe tener al menos 20 caracteres.");
    }
    else
    {
        estudiantes[alumnoID -1].ejercicios[ejercicioID -1].devolucion = devolucionTxt;
        alert(`¡Devolución para ${estudiantes[alumnoID -1].nombre} en ${estudiantes[alumnoID -1].ejercicios[ejercicioID -1].titulo} agregada!`);
        //document.querySelector("#btnConfirmarDevolucionPP").hidden; //escondemos botón de devoluciones
        document.querySelector("#ejercicioMostradoADevolverPPHTML").innerHTML=""; //vaciamos HTML del ejercicio
        ejerciciosEsperandoDevolucionPP(); //actualizamos lista de ejercicios para que este ejercicio ya no aparezca
       //actualizamos lista de estudiantes, si se evaluaron todos los ejercicios de un estudiante, este ya no debería aparecer
       devolucionPP();    
    }
}

function mostrarEstadisticasPE(_estudianteID, _id){
    let estudianteObj = estudiantes[_estudianteID -1];
    let statsPEHTML = 
    `<h3>Estadísticas estudiantiles de ${estudianteObj.nombre}</h3>
    <table>
        <tbody>
            <tr>
                <td>
                    ${estudianteObj.nombre}
                </td>
                <td>
                    ${estudianteObj.nivel}
                </td>
            </tr>
            <tr>
                <td>
                    Ejercicios planteados</td>
                <td>${estudianteObj.ejsAsignados}</td>
                </td>
            </tr>
            <tr>
                <td>
                    Ejercicios resueltos</td>
                <td> ${estudianteObj.ejsCompletos} (${(estudianteObj.ejsCompletos *100) / estudianteObj.ejsAsignados}%)
                </td>
            </tr>
            <tr>
                <td>
                    Ejercicios calificados</td>
                <td>${estudianteObj.ejsConDevolucion}
                </td>
            </tr>
            <tr>
                <td>
                    Ejercicios no calificados</td>
                <td>${estudianteObj.ejsCompletos - estudianteObj.ejsConDevolucion}
                </td>
            </tr>
        </tbody>
    </table>`;
    
    //mostramos el HTML en la página
    document.querySelector(_id).innerHTML = statsPEHTML;
}

function crearStatsPPHTML(){
    let htmlStats = statsDeClasePP(usuarioLogueado.id);
    document.querySelector("#statsPP").innerHTML=htmlStats;
}

//calcular alumno o alumnos que han resuelto más ejercicios
//calcular cantidad de ejercicios entregados
function statsDeClasePP(_profesorID)
{
    let arrayAlumnosConMasResueltos = [];
    let alumnoConMasResueltos = null;
    let ejerciciosEntregados = 0;
    //recorrer alumnos del profesor y tomar cantidad de ejercicios resueltos de cada uno, sin importar el nivel
    for (let i = 0; i < profesores[_profesorID -1].alumnos.length; i++)
    {
        //actualizamos las estadísticas de los alumnos del profesor
        statsEstudiante(profesores[_profesorID -1].alumnos[i].id);
    }
    //ahora que los estudiantes tienen sus estadísticas actualizadas, podemos comparar
    for (let i = 0; i < profesores[_profesorID -1].alumnos.length; i++)
    {
        //si el alumno iterado tiene la misma cantidad de ejercicios resueltos, lo agregamos al array
        if (alumnoConMasResueltos === null || alumnoConMasResueltos.ejsCompletos < profesores[_profesorID -1].alumnos[i].ejsCompletos) // si alumnoConMasResueltos está null, O si el alumnoConMasResueltos tiene menos ejsCompletos que el alumno iterado
        {
            arrayAlumnosConMasResueltos = []; //borramos el contenido del array, para que sólo esté el alumno con más entregas (o los alumnos con más entregas)
            alumnoConMasResueltos = profesores[_profesorID -1].alumnos[i]; //actualizamos el valor de alumnoConMasResueltos
            //alumnoConMasResueltos = `<br>${profesores[_profesorID -1].alumnos[i]}`; //BUGFIX 1 parte 2, esta línea fue parte de una idea de solución previa, estaba dando un error
            arrayAlumnosConMasResueltos.push(profesores[_profesorID -1].alumnos[i].nombre); //ponemos al alumno iterado en el array
        }

        //si el alumno iterado tiene la misma cantidad de ejercicios resueltos, lo agregamos al array
        if (alumnoConMasResueltos.ejsCompletos === profesores[_profesorID -1].alumnos[i].ejsCompletos && alumnoConMasResueltos.id !== profesores[_profesorID -1].alumnos[i].id) //BUGFIX 2, el && es para evitar que el alumno iterado se cuente dos veces (porque el bloque if de arriba lo deja como alumnoConMasResueltos, entonces se compara consigo mismo al empezar este bloque)
        {
            arrayAlumnosConMasResueltos = [];
            arrayAlumnosConMasResueltos.push(alumnoConMasResueltos.nombre);
            arrayAlumnosConMasResueltos.push(profesores[_profesorID -1].alumnos[i].nombre);
        }

        //aumentamos el contador de ejerciciosEntregados deacuerdo con los ejercicios entregados del alumno iterado
        ejerciciosEntregados += profesores[_profesorID -1].alumnos[i].ejsCompletos;

        if (ejerciciosEntregados === 0) //si nadie entregó ejercicios
        {
            //vaciamos el array de mejores alumnos
            arrayAlumnosConMasResueltos = [];
        }

    } //BUGFIX 1 parte 1, este for estaba mal cerrado, por lo que en la primera iteración ya se hacía un return
        //return HTML
        return `
        <h3>Estadísticas de los alumnos</h3>
        Entregas totales: ${ejerciciosEntregados}
        <br><br>
        Mejores alumnos: ${arrayAlumnosConMasResueltos}.
        <br><br>
        <select id="alumnosStats">
        </select>
        <div id ="alumnoSeleccionadoStats"></div>
        `;
}

//para la sección de nivelar estudiantes, Para Profesor
function listaEstudiantesStats(){
    let opciones = `<option hidden value="elegir">Seleccionar alumno</option>`; //variable para opciones que mostraremos en el html de nivelar estudiantes, la primera opción sólo dirá "Seleccionar alumno", estará hidden para que no se pueda seleccionar, value por defecto es "elegir"
    //for para recorrer los alumnos del profesor logueado
    for (let i = 0; i < usuarioLogueado.alumnos.length; i++)
    {
        //agregamos alumno con html para que sea una opción válida para el select; el value será el objeto en sí mismo, y el nombre aparecerá como opción a seleccionar
        opciones += `<option value="${usuarioLogueado.alumnos[i].id}">${ usuarioLogueado.alumnos[i].nombre }</option>`
    }
    document.querySelector("#alumnosStats").innerHTML=opciones; //mostramos las opciones de estudiantes
}

function mostrarStatsEstudiantePP(){
    mostrarEstadisticasPE(document.querySelector("#alumnosStats").value, "#alumnoSeleccionadoStats");
}

///////////////////////////////
//ESTADO INICIAL DE LA PÁGINA//
///////////////////////////////
nadieLogged();

//Dar ID a los objetos precargados (estudiantes, profesores, ejercicios)
crearID(profesores);
crearID(estudiantes);
crearID(ejercicios);
//Asignar ejercicios a todos los estudiantes
asignarEjsATodos();
