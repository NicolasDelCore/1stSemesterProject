//Como no podemos usar más de una página HTML (porque no podemos recargar la página y no estamos usando base de datos), tenemos funciones para ocultar y mostrar contenido según sea necesario
//OCULTAR O MOSTRAR ELEMENTO, _id del elemento HTML y _n=1 para visualizar o _n=0 para ocultar, _inline será un bool para decidir si mostramos el elemento como bloque o inline (true)
//Nota: si inline está vacío o tiene un valor distinto de true, n=1 y el _id existe, el elemento se mostrará como bloque

//para validar si una entrada de datos tiene espacios
function validarEspaciosEnBlanco(value){ //para validar si el username tiene espacios en blanco O está vacío
    return (value.indexOf(' ') >= 0 || value===""); //usa .indexOf del string pasado en el parámetro value para devolver true o false si la cantidad de espacios en blanco es mayor a 0, o si el parámetro value está vacío
    //FUENTE de este código: https://www.tutorialspoint.com/check-if-a-string-has-white-space-in-javascript
}

function validarEmpty(value){ //Valida si value está vacío o no (ej: para validar si se puso nombre)
    return value==="";
}

//validar letras, función de apoyo para la función de removerSimbolos
function esLetra(_letra){
    let letra = `${_letra}`; //siempre trataremos esta entrada como caracter, nunca como número por ejemplo, porque charCodeAt sólo funciona con caracteres, sino devuelve errores de que no existe para números
    if ( letra.charCodeAt() >= 97 && letra.charCodeAt() <= 122 || letra.charCodeAt() >= 65 && letra.charCodeAt() <= 90) //verificamos si el código ASCII de _letra se coincide con el ASCII de mayúsculas y minúsculas
    {
        return true; //es una letra
    }
    else
    {
        return false; //no es una letra
    }
}

//remover caracteres que no son letra o número de un string (ej: puntos y guiones), para evaluar búsquedas de texto por ejemplo
function removerSimbolos(_palabra){    
    resultado = "";
    for (let i = 0; i < _palabra.length; i++)
    {
        if ( esLetra(_palabra[i]) || !isNaN(_palabra[i])) //si el caracter es letra o es número
        resultado += _palabra[i]; //agregamos el caracter a resultado
    }
    return resultado; //devolvemo
}

//función de apoyo, remover acentos por letra, para que las búsquedas por texto no fallen por problemas de acentuación
function removerAcentosPorLetra(_letra){
    let letra1 = _letra; //acá guardaremos la letra original para comparar
    let letra2 = (_letra.toLowerCase()) //utilizaremos esto para el switch
    let letraSinAcento = ""; //variable vacía

    switch (letra2) {
    //tipo de acento 1
        case "á":
            letraSinAcento = "a";
            break;
        case "é":
            letraSinAcento = "e";
            break;
        case "í":
            letraSinAcento = "i";
            break;
        case "ó":
            letraSinAcento = "o";
            break;
        case "ú":
            letraSinAcento = "u";
            break;
    //tipo de acento 2
        case "à":
            letraSinAcento = "a";
            break;
        case "è":
            letraSinAcento = "e";
            break;
        case "ì":
            letraSinAcento = "i";
            break;
        case "ò":
            letraSinAcento = "o";
            break;
        case "ù":
            letraSinAcento = "u";
            break;
    //diéresis
        case "ä":
            letraSinAcento = "a";
            break;
        case "ë":
            letraSinAcento = "e";
            break;
        case "ï":
            letraSinAcento = "i";
            break;
        case "ö":
            letraSinAcento = "o";
            break;
        case "ü":
            letraSinAcento = "u";
            break;
    }

    //si letra2 y letra1 son iguales, significa que ambas eran minúsculas
    if (letra1 !== letra2) //por tanto, si letra1 es distinta de letra2
    {
        letraSinAcento = letraSinAcento.toUpperCase(); //convertimos letraSinAcento a mayúscula
    }

    return letraSinAcento; //devolvemos la letra desasentuada
}

//función de apoyo, remover acentos por palabra, para que las búsquedas por texto no fallen por problemas de acentuación
function removerAcentosEnPalabra(_texto){

    let resultado = ""; //variable que guarda el resultado

    for(let i = 0; i < _texto.length; i++)
    {
        if (removerAcentosPorLetra(_texto[i]) === "") //si devolverAcentoPorLetra devuelve vacío
        {
            resultado += _texto[i]; //guardamos el caracter correspondiente
        }
        else //sino
        {
            resultado += removerAcentosPorLetra(_texto[i]); //guardamos la vocal desasentuada
        }
    }
    return resultado;
}

function hideAndShow(_id, _n, _inline){ //pedimos una ID y un valor (n) que podrá ser 0 o 1, _n es para forzar que el resultado sea el esperado (ya sea ocultar o mostrar algo)

    let elemento = document.querySelector(_id); //para resumir código después
    //OCULTAR
    if (elemento.style.display !== "none") //si el elemento no está oculto
    {
        if (_n === 0) //si _n es 0
        {
            document.querySelectorAll(_id).forEach(function (e) {e.style.display="none"}); //lo ocultamos
            return `${_id} Escondido`
        }
        else
        {
            return `ERROR en atributo _id`;
        }
    }
    //MOSTRAR
    else //si el elemento está oculto
    {
        if (_n === 1) //si _n es 1
        {
            if (_inline != true)
            {
                document.querySelectorAll(_id).forEach(function (e) {e.style.display="block"}); //lo des-ocultamos, mostrando el elemento como bloque
                return `${_id} mostrado - bloque`
            }
            else
            {
                document.querySelectorAll(_id).forEach(function (e) {e.style.display="inline"}); //lo des-ocultamos, mostrando el elemento como bloque
                return `${_id} mostrado - inline`
            }
        }
        else
        {
            return `ERROR en atributo _id o _n`;
        }
    }
}

//OCULTAR TODO, MENOS (id del elemento)
//Esta función corre hideAndShow para mostrar lo que queremos mostrar y ocultar todo lo demás
function hideEverythingBut(_id){
    //array indexado que contiene todas las IDs de contenido    
    arrayIDs = ["#statsPE", "#ejerciciosResueltosPE", "#entregaPE", "#ejerciciosBusquedaPE", "#nivelarEstudiantePP", "#plantearEjercicioPP", "#devolverEjPP", "#statsPP", "#blogRecibidorGlobal", "#registroGlobal"];

    for(i = 0; i < arrayIDs.length; i++)
    {
        if (_id !== arrayIDs[i])
        {
            hideAndShow(arrayIDs[i], 0)
        }
        else
        {
            hideAndShow(arrayIDs[i], 1)
        }
    }
}

function exigirEleccion(_eleccion){
    //verificamos si se elegigió una opción del select
    if (_eleccion === "elegir") //opcion por defecto debe tener value "elegir"
    {
        return false; //si no hubo elección, devolvemos false
    }
    else
    {
        return true; //si hubo elección, devolvemos true
    }
}

//crea IDs para todos los objetos dentro de un array
function crearID(_arrayObjetos){
    for (let i=0; i < _arrayObjetos.length; i++)
    {
        let nuevoID = i + 1;
        _arrayObjetos[i].id = nuevoID;
    }
}

//crea la ID de un objeto individual, esto se debe usar al crear un objeto nuevo dentro de un array
function crearIDUltimoObjeto(_arrayObjetos){
    let nuevoID = _arrayObjetos.length; //como al objeto se le hace un push, será el último miembro del array, por tanto, su ID es igual a arrayObjetos.length (que cuenta desde 1, en vez de desde 0, hasta el último lugar del array)
    _arrayObjetos[_arrayObjetos.length-1].id = nuevoID; //buscamos el elemento "id" dentro del último objeto del array (contendando desde 0 a la última posición, que será _arrayObjetos.length-1), dentro del array donde está el objeto, y le asignamos el valor nuevoID al .id del objeto
}

//VALIDAR LOGIN
function validarLogin(_usuario, _contraseña){

    let usuarioEncontrado = false;
    let usuarioObjeto;

    //buscamos al usuario en Estudiantes
    for (let i = 0; i < estudiantes.length; i++){

        if (_usuario.toLowerCase() === estudiantes[i].usuario.toLowerCase()) //comparamos el nombre de usuario ingresado (convertido a minúscula) con el atributo .usuario (convertido a minúscula) del elemento iterado
        {
            //si encontramos el usuario
            usuarioEncontrado = true; //cambiamos la flag usuarioEncontrado a true
            usuarioObjeto = estudiantes[i]; //asignamos el objeto iterado a usuarioObjeto
            break; //rompemos con el for
        }
    }

    //buscamos al usuario en Profesores
    if (usuarioEncontrado === false) //si no encontramos el usuario en el array de estudiantes
    {
        for (let i = 0; i < profesores.length; i++) //buscamos dentro del array de profesores
        {
            if (_usuario.toLowerCase() === profesores[i].usuario.toLowerCase())//comparamos el nombre de usuario ingresado (convertido a minúscula) con el atributo .usuario (convertido a minúscula) del elemento iterado
            {
                usuarioEncontrado = true; //cambiamos la flag usuarioEncontrado a true
                usuarioObjeto = profesores[i];  //asignamos el objeto iterado a usuarioObjeto
                break; //rompemos con el for
            }
        }
    }

    if (usuarioEncontrado === true) //si encontramos el usuario
    {
        if (_contraseña === usuarioObjeto.contraseña)
        {
            console.log(`USUARIO LOGUEADO CORRECTAMENTE`); //avisamos en la consola de desarrollo que se logueó un usuario
            //si se logeó un estudiante
            if (usuarioObjeto.rol === "estudiante")
            {                   
                //refrescamos los ejercicios que tiene asignados
                asignarEjercicios(usuarioObjeto.id); 
            }
            return usuarioObjeto; //devolvemos el objeto
        }
        else //Si la contraseña está mal
        {
            return `USUARIO O CONTRASEÑA INCORRECTOS`; //mostramos error
        }
    }
    else //si usuarioEncontrado es false luego de buscar en los arrays de estudiantes y profesores
    {
        return `USUARIO O CONTRASEÑA INCORRECTOS`; //mostramos error
    }
}

//Verificar si todos los datos del formulario de registro son correctos, y en caso de serlos, crear un usuario, sino, devolver errores
function completarRegistro(_contraseña1, _contraseña2, _nombreDeUsuario, _nombreCompleto, _tipoDeUsuario, _profEscogido, _profCodigo){
    
    let rolDelUsuario = verificarTipoDeUsuario(_tipoDeUsuario);
    let nombreCompletoVerificado = verificarNombreCompleto(_nombreCompleto); //guardamos la devolución de esta función en verificarNombreCompleto (verificamos si el nombre está vacío y si es menor a mínimo 5 caracteres)
    let usernameVerificado = verificarRegistroUsername(_nombreDeUsuario); //guardamos la devolución de esta función en usernameVerificado (revisaremos si el campo de username está vacío y si es único o no)
    let contraseñaVerificada = verificarRegistroContraseña(_contraseña1, _contraseña2);  //guardamos la devolución de esta función en contraseñaVerificada ; se verificará si: la contraseña es igual a su repetición, y si la contraseña cumple con los estándares de seguridad (4 dígitos, al menos una mayúscula, una minúscula y un número)
    let profEscogido = verificarProfEscogido(_profEscogido);
    let profCodigo = verificarProfCodigo(_profCodigo);
    let errores = ""; //definimos ese string para devolver errores de haberlos

    //verificaciones
    
    if (rolDelUsuario !== "OK") //si no se elige el tipo de usuario (estudiante o profesor)
    {
        errores = `${rolDelUsuario}`; //mostramos el error
    }

    if (nombreCompletoVerificado !== "OK") //si nombreCompletoVerificado devuelve distinto de "OK"
    {
        errores += `<br><br>${nombreCompletoVerificado}`; //agregamos errores
    }
    if (usernameVerificado !== "OK") //si usernameVerificado devuelve distinto de "OK"
    {
        errores += `<br><br>${usernameVerificado}`; //agregamos errores
    }
    if (contraseñaVerificada !== "OK") //si contraseñaVerificada devuelve distinto de "OK"
    {
        errores += `<br><br>${contraseñaVerificada}`; //agregamos errores
    }
    //si el tipo de usuario es estudiante, se debe elegir un profesor
    if (_tipoDeUsuario === "estudiante")
    {
        if (profEscogido !== "OK") //sino
        {
            errores += `<br><br>${profEscogido}`; //mostrar error
        }
    }
    //si el tipo de usuario es profesor, se debe poner la clave para poder registrar profesores (otorgada por Recursos Humanos o la directora o algo así)
    if (_tipoDeUsuario === "profesor")
    {
        if (profCodigo !== "OK") //sino
        {
            errores += `<br><br>${profCodigo}`; //mostrar error
        }
    }
 
    //Completando el registro
    if (errores === "") //si no hay errores
    {
        //creamos objeto profesor
        if (_tipoDeUsuario === "profesor")
        {
            profesores.push( new Profesor (_nombreCompleto, _nombreDeUsuario, _contraseña1) );
            //Damos ID al objeto recién creado:
            crearIDUltimoObjeto(profesores);
        }
        //sino, creamos estudiante
        else if (_tipoDeUsuario === "estudiante")
        {
            estudiantes.push( new Estudiante (_nombreCompleto, _nombreDeUsuario, _contraseña1, _profEscogido, "inicial") ); //los alumnso recién registrados tienen nivel "Inicial" por defecto
            //Damos ID al objeto recién creado:
            crearIDUltimoObjeto(estudiantes);
        }
        //completamos el registro
        return(`REGISTRO COMPLETADO ${_tipoDeUsuario} ${_nombreCompleto}`);
    }
    else //sino
    {
        return errores; //devolvemos los errores
    }
}


function verificarTipoDeUsuario(_tipoDeUsuario){
    if (exigirEleccion(_tipoDeUsuario) === false) //si no se elige el tipo de usuario (estudiante o profesor)
    {
        return "ERROR: Debe elegir si registrarse como Estudiante o Profesor"; //mostramos un error
    }
    else 
    {
        return "OK";
    }
}

function verificarProfEscogido(_profEscogido){
        //_profEscogido NO debe estar vacío
        if (exigirEleccion(_profEscogido) === false)
        {
            return `ERROR: Debe escoger un profesor.`;
        }
        else
        {
            return "OK";
        }
    }

    
function verificarProfCodigo(_profCodigo){
    //el código debe ser igual a YOTENGOELPODER
    if (_profCodigo !== "YOTENGOELPODER")
    {
        return `ERROR: Código incorrecto para registrarse como profesor.`;
    }
    else
    {
        return "OK";
    }
}

function verificarNombreCompleto(_nombre){
    //verificamos que no esté vacío el nombre
    if (validarEmpty(_nombre)) //validarEmpty devuelve true si está vacío
    {
        return `ERROR: "Nombre completo" está vacío.`; //si está vacío, devolvemos error
    }
    else //si el nombre no está vacío
    {
        //verificamos que el nombre sea mayor a 5 caracteres
        if (_nombre.length < 5)
        {
            return `ERROR: "Nombre completo" es muy corto. Mínimo 5 caracteres.`; //si el nombre es muy corto, devolvemos error
        }
        else if (_nombre.length > 30)
        {
            return `ERROR: "Nombre completo" es muy largo. Máximo 30 caracteres.`; //si el nombre es muy largo, devolvemos error
        }
        else //sino
        {
            return `OK`; //devolvemos "OK"
        }
    }
}

//función para la página de registro, validar nombre de usuario
function verificarRegistroUsername(_nombreDeUsuario){
    let usernameRepetido = false;
    //verificar que el username no tenga espacios en blanco y no esté vacío, sino, devolver error
    if (validarEspaciosEnBlanco(_nombreDeUsuario)) //si el nombre tiene espacios en blanco o está vacío, validarEspaciosEnBlanco devuelve true
    {
        return `ERROR: El nombre de usuario tiene espacios o está vacío.`; //y si validarEspaciosEnBlanco es true, devolvemos un error
    }

    if (_nombreDeUsuario.length < 4)
    {
        return `ERROR: El nombre de usuario es muy corto. Por favor, escriba 4 caracteres o más.`
    }

    if (_nombreDeUsuario.length > 15)
    {
        return `ERROR: El nombre de usuario es muy largo. Debe ser 15 o menos caracteres.`
    }

    //verificar que el username no esté repetido, sino, devolver error
    else
    {
        //revisamos si el nombre de usuario existe dentro del array profesores
        for (i=0; i < profesores.length; i++)
        {
            if (_nombreDeUsuario === profesores[i].usuario)
            {
                usernameRepetido = true;
                break;
            }
        }

        //revisamos si el nombre de usuario existe dentro del array estudiantes
        for (i=0; i < estudiantes.length; i++)
        {
            if (_nombreDeUsuario === estudiantes[i].usuario)
            {
                usernameRepetido = true;
                break;
            }
        }

        //si el nombre de usuario está repetido
        if (usernameRepetido === true)
        {
            return `ERROR: El nombre de usuario ya está en uso, por favor elija otro.`;
        }
        else
        {
            return "OK";
        }
    }
}

//función para la página de registro, validar contraseña
function verificarRegistroContraseña(_contraseña1, _contraseña2){
    //verificar que "contraseña" y "repetir contraseña" sean igual
    if (_contraseña1 !== _contraseña2)
    {
        return `ERROR: La contraseña no coincide.`;
    }
    //si la contraseña no cumple con los requisitos de seguridad
    else if (validarContraseña(_contraseña1) === false) // (si validarContraseña devuelve falso)
    {
        //devolvemos error
        return "ERROR: La contraseña no cumple con los requisitos de seguridad:<br>Una mayúscula, una minúscula, un número y mínimo 4 caracteres.";
    }
    else //sino (si validar contraseña devuelve true)
    {
        //todo bien
        return "OK";
    }
}

//código hecho en clase
function validarContraseña(pTexto) {
    let resultado = false;
    let minusc = false;
    let mayusc = false;
    let numer = false;
    if (pTexto.length >= 4) {
        for (let index = 0; index < pTexto.length; index++) {
            if (pTexto[index] >= 'A' && pTexto[index] <= 'Z') {
                mayusc = true;
            }
            if (pTexto[index] >= 'a' && pTexto[index] <= 'z') {
                minusc = true;
            }
            if (pTexto[index] >= '0' && pTexto[index] <= '9') {
                numer = true;
            }
            if (mayusc && minusc && numer) {
                resultado = true;
                break;
            }
        }		
    }
    return resultado;
}

function crearEjercicioPP(_titulo, _letra, _nivel, _img){

    let tituloYDescripVerificados = verificarCampoTituloYDescrip(_titulo, "título", _letra, "descripción", 200, 20); //verificamos título y descripción
    let nivelVerificado = elegirNivel(_nivel); //verificamos que se escogió un nivel
    let profesorUsuario = usuarioLogueado.id; //tomamos el ID del profesor que crea el ejercicio
    let errores = "";

    //Testing //console.log(tituloVerificado); //console.log(descripcionVerificada); //console.log(nivelVerificado); //console.log(profesorUsuario);

    //si todas las verificaciones dan distinto de OK, agregamos el error a mostrar con variable errores
    if (tituloYDescripVerificados !== "OK")
    {
        errores = tituloYDescripVerificados;
    }

    if (nivelVerificado !== "OK")
    {
        errores += `<br><br>${nivelVerificado}`;
    }

    if (_img === "")
    {
        errores += `<br><br>ERROR: Falta agregar una imagen`;
    }

    //evitar que los alumnos jueguen con la consola y creen ejercicios
    if (usuarioLogueado.rol !== "profesor")
    {
        return "DEJÁ DE HACKEAR LA PÁGINA, te van a expulsar.";
    }

    if (errores !== "") //si hay errores
    {
        return errores; //devolvemos los errores
    }

    else //sino
    {
        //creamos el objeto
        ejercicios.push( new Ejercicio (_titulo, _letra, _nivel, profesorUsuario, _img, "", "", "") );
        //NOTA: audio y devolución estarán vacios porque se llenarán en otras secciones de la página

        //Damos ID al objeto recién creado:
        crearIDUltimoObjeto(ejercicios);

        return "OK"; //devolvemos un "OK"
    }
}

//Verificar que los campos no estén vacíos
//Esta función toma un atributo _campo (un ID html de la página o un valor), un _tipoDeCampo (por ejemplo: "título" o "descripción") que será relevante en los errores mostrados, un _min caracter para limitar la cantidad mínima de caracteres y un _maxCaracter entero para limitar la cantidad de caracteres
function verificarCampoTituloYDescrip(_campo1, _tipoDeCampo1, _campo2, _tipoDeCampo2, _maxCaracter, _minCaracter){

    //si ambos campos están vacíos
    if ( validarEmpty(_campo1) && validarEmpty(_campo2))
    {
        return `ERROR: Falta completar ${_tipoDeCampo1} y ${_tipoDeCampo2}.`;
    }
    //verificamos que _campo1 no esté vacío
    if (validarEmpty(_campo1))
    {
        //sino devolvemos error
        return `ERROR: Falta completar ${_tipoDeCampo1}.`;
    }
    if (validarEmpty(_campo2))
    {
        //sino devolvemos error
        return `ERROR: Falta completar ${_tipoDeCampo2}.`;
    }
    //verificamos que titulo y descripción tengan la longitud máxima correcta en conjunto
    if (_campo1.length + _campo2.length > _maxCaracter)
    {
        //sino devolvemos error
        return `ERROR: ${_tipoDeCampo1} y ${_tipoDeCampo2} no deben tener en conjunto más de ${_maxCaracter} caracteres.`;
    }
    //verificamos que titulo y descripción tengan la longitud mínima correcta, separados (1 caracter cada uno) y en conjunto (20)
    if (_campo1.length < 1 || _campo2.length < 1 || _campo1.length + _campo2.length < 20)
    {
        //sino devolvemos error
        return `ERROR: ${_tipoDeCampo1} y ${_tipoDeCampo2} deben tener un mínimo de 20 caracteres y no estar vacíos.`;
    }
    //si no hay errores, devolvemos "OK"
    return "OK";
}

//Verificar que se eligió nivel o devolver error
function elegirNivel(_nivel){
    if (!exigirEleccion(_nivel))
    {
        return `ERROR: Debe elegir un nivel para el ejercicio.`;
    }
    else
    {
        return `OK`;
    }
}

//si el usuario es un profesor, vaciamos el array de alumnos - cuando un profesor entra, esta función se usa para llenar la lista de alumnos al hacer login y vaciarla para salvar recursos al hacer logout
function vaciarAlumnosProfesor()
{
    if (usuarioLogueado instanceof Profesor)
    {
        //actualizamos los alumnos de ese profesor
        usuarioLogueado.alumnos = [];
    }
}

//correr cada vez que se loguea un profesor
//esto optimiza recursos, sólo cargando en la página los estudiantes del profesor logueado, en vez asignar todos los estudiantes a todos los profesores
function asignarEstudiantes(_profesorID){ //pedimos el ID de un profesor
    //vaciamos el array de estudiantes para no repetir ninguno
    vaciarAlumnosProfesor();

    for (let i=0; i < estudiantes.length; i++) //recorremos array alumnos
    {
        if (estudiantes[i].profesor === _profesorID) //si el ID del profesor ingresado es igual al ID del .profesor del estudiante
        {
            profesores[_profesorID-1].alumnos.push(estudiantes[i]); //lo agregamos
        }
    }
}

function asignarEjercicios(_estudianteID){ //tomamos el ID del estudiante    
    let estudianteEj = estudiantes[_estudianteID -1];
    for (let i=0; i < ejercicios.length; i++) //recorremos array ejercicios
    {
        if (ejercicios[i].profesor === estudianteEj.profesor) //si el creador del ejercicio tiene el mismo ID  que el valor .profesor del estudiante
        {
            //verificamos nivel de ejercicio con nivel del estudiante, si son el mismo
            if (ejercicios[i].nivel === estudianteEj.nivel)  
            {
                //si el ejercicio no está asignado
                if (ejercicioYaAsignado(_estudianteID, ejercicios[i].id) === false)
                {
                    //Creamos una nueva instancia del ejercicio y lo agregamos al array "ejercicios" del estudiante
                    //De esta manera, el ejercicio "original" no se modifica para los demás estudiantes, cada estudiante tendrá una copia del ejercicio que podrá resolver y el profesor evaluar
                    estudianteEj.ejercicios.push(new Ejercicio ( ejercicios[i].titulo, ejercicios[i].letra, ejercicios[i].nivel, ejercicios[i].profesor, ejercicios[i].imagen, "", ejercicios[i].id ) ); //copiamos título, letra, nivel, profesor e imagen a la nueva instancia de Ejercicio, PERO, el ID será diferente, y por supuesto, audio y devolución obtendrán su valor en otro momento (cuando el alumno suba el audio y el profesor la devolución, respectivamente)
                    //nota: como estamos copiando los valores del "modelo" de ejercicio a una nueva instancia de Ejercicio, esto es un objeto nuevo que se puede editar sin modificar el "modelo" original del ejercicio
                    crearIDUltimoObjeto(estudianteEj.ejercicios); //le asignamos una ID individual/nueva a este ejercicio
                }
            }
        }
    }
}

//revisar si el estudiante ya tiene asignado el ejercicio o no
function ejercicioYaAsignado(_estudianteID, _ejercicioID){
    let estudianteEj = estudiantes[_estudianteID -1];
    //recorremos ejercicios ya asignados al estudiante
    for (let i=0; i < estudianteEj.ejercicios.length; i++)
    {
        //si el _ejercicioID ya existe dentro de los ejercicios del estudiante
        if (estudianteEj.ejercicios[i].idDelPlanteo === _ejercicioID) //si el estudiante tiene un ejercicio con la misma idDelPlanteo que la ID del ejercicio con el cuál estamos comparando
        {
            return true; //devolvemos true (el ejercicio ya está asignado)
        }
    }
    //si el ejercicio no existe dentro de la lista de ejercicios asignados
    return false;
}

//Asignar ejercicios a todos los estudiantes (ejecutado cuando la página carga por primera vez)
function asignarEjsATodos(){
    for (let i = 0; i < estudiantes.length; i++)
    {
        asignarEjercicios(estudiantes[i].id);
    }
}

//Asignar ejercicios a todos los estudiantes de un profesor (ejecutado cuando un profesor crea un ejercicio)
function ejsParaAlumnosDelProfesor(_profesorID){
    let profesor = profesores[_profesorID-1];
    for (let i = 0; i < profesor.alumnos.length; i++)
    {
        asignarEjercicios(profesor.alumnos[i].id);
    }
}

function buscarEjsPorCompletitudPE(_completitud){ //función para que el estudiante busque dentro de sus ejercicios asignados, aquellos que coincidan con el bool _completitud

    let ejsPorCompletitudEncontrados = []; //array para guardar los ejercicios

    for (let i=0; i < usuarioLogueado.ejercicios.length; i++) //recorremos los ejercicios asignados al usuario (al alumno logueado)
    {
        if (_completitud === usuarioLogueado.ejercicios[i].completo) //si el bool _completitud es igual al .completo del ejercicio iterado
        {
            ejsPorCompletitudEncontrados.push(usuarioLogueado.ejercicios[i].id); //guardamos el ejercicio en el array ejsPorCompletitudEncontrados
        }
    }

    return ejsPorCompletitudEncontrados; //devolvemos ejsPorCompletitudEncontrados
}

function buscarEjsPorTextoPE(_busqueda, _completitud){ //función para que el estudiante busque ejercicios por texto

    let busqueda = removerAcentosEnPalabra(_busqueda).toLowerCase(); //forzamos _busqueda a ser minúscula, y sin acentos para las búsquedas
    busqueda = removerSimbolos(busqueda); //removemos cualquier símbolo de "busqueda"
    let ejerciciosDisponibles = buscarEjsPorCompletitudPE(_completitud); //guardamos los ejercicios del estudiante que tienen el bool _completitud buscado (la función buscarEjsPorCompletitudPE se encarga de devolver esto)
    let ejsPorTituloEncontrados = false; //bool para verificar si se encontraron ejercicios por título, false por default, si no se encuentran ejs por título se buscará en las descripciones
    let ejerciciosEncontradosPorTitulo = []; //array para devolver los ejercicios encontrados por la función
    let ejerciciosEncontradosPorLetra = [];

    //buscar por título, dentro de los ejercicios asignados al estudiante
    for (let i=0; i < ejerciciosDisponibles.length; i++) //recorremos ejerciciosDisponibles
    {
        //nota: search devuelve -1 si no encuentra nada, así que nos interesan sólo los resultados que no sean -1
        //fuente sobre la función Search: https://www.w3schools.com/jsref/jsref_search.asp

        //si se encuentran ejercicios por título (si busqueda es parte del título)
        let tituloEj = removerAcentosEnPalabra(usuarioLogueado.ejercicios[ejerciciosDisponibles[i]-1].titulo.toLowerCase()); //guardamos el título en la variable tituloEj, sin acentos y en minúscula
        tituloEj = removerSimbolos(tituloEj); //removemos los símbolos de tituloEj
        if ( ( tituloEj.search(busqueda) ) !== -1 ) //comparamos tituloEj con busqueda (a ambos se les convertitió a minúscula y se les removió los símbolos, los acentos), si el resultado es distinto a -1, hay coincidencia en la comparación
        {
            ejsPorTituloEncontrados = true;
            ejerciciosEncontradosPorTitulo.push(usuarioLogueado.ejercicios[ejerciciosDisponibles[i]-1].id); //guardamos el ejercicio devuelto por "buscarEjsPorCompletitudPE" dentro del array "ejercicios" del usuario logueado
        }

        //si no se encontró relación por título, buscar dentro de la descripción
        if (ejsPorTituloEncontrados === false)
        {
            let letraEj = removerAcentosEnPalabra(usuarioLogueado.ejercicios[ejerciciosDisponibles[i]-1].letra.toLowerCase()); //guardamos descripción en variable letraEj, sin acentos y en minúscula
            letraEj = removerSimbolos(letraEj); //retiramos símbolos de letraEj
            if ( ( letraEj.search(busqueda) ) !== -1 ) //comparamos letraEj con busqueda (a ambos se les convertitió a minúscula y se les removió los símbolos, los acentos), si el resultado es distinto a -1, hay coincidencia en la comparación
            {
                ejerciciosEncontradosPorLetra.push(usuarioLogueado.ejercicios[ejerciciosDisponibles[i]-1].id); //agregamos el ejercicio al array ejerciciosEncontradosPorLetra
            }
        }
    }

    if (ejsPorTituloEncontrados === false) ////si no se encontraron ejercicios por título
    {
        return ejerciciosEncontradosPorLetra; //devolvemos los ejercicios encontrados por letra
    }
    else //sino
    {
        return ejerciciosEncontradosPorTitulo; //devolvemos los ejercicios encontrados por título
    }
}

function statsEstudiante(_estudianteID){
    //contador para los ejercicios completos
    let ejsCompletos=0;
    //contador para los ejercicios con devolución
    let ejsConDevolucion=0;
    //for para recorrer todos los ejercicios asignados al alumno
    let ejsIncompletos=0;
    //for para recorrer todos los ejercicios asignados al alumno
    for (let i = 0; i < estudiantes[_estudianteID -1].ejercicios.length; i++)
    {
        //si el ejercicio está completo
        if (estudiantes[_estudianteID -1].ejercicios[i].completo === true)
        {
            ejsCompletos++; //sumamos uno al contador de ejs completos
            //revisamos si el ejercicio tuvo devolución o no
            if (estudiantes[_estudianteID -1].ejercicios[i].devolucion !== "" && estudiantes[_estudianteID -1].ejercicios[i].devolucion !== undefined)
            {
                ejsConDevolucion++; //sumamos uno al contador de ejercicios con devolución
            }
        }
        //sino, si el ejercicio no está completo
        else
        {
            ejsIncompletos++; //sumamos uno al contador de ejercicios incompletos
        }
    }

    //actualizamos estadísticas del estudiante
    estudiantes[_estudianteID -1].ejsAsignados = ejsCompletos + ejsIncompletos; //para estadísticas
    estudiantes[_estudianteID -1].ejsCompletos = ejsCompletos; //para estadísticas
    estudiantes[_estudianteID -1].ejsIncompletos = ejsIncompletos; //para estadísticas
    estudiantes[_estudianteID -1].ejsConDevolucion = ejsConDevolucion; //para estadísticas
    
    return console.log(`Estadísticas del estudiante ${estudiantes[_estudianteID-1].nombre} actualizadas.`);
}
