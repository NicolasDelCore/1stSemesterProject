//clase Estudiante
class Estudiante{
    constructor(pNombre, pUsuario, pContraseña, pProfesor, pNivel, pID)
    {
        this.nombre = pNombre;
        this.usuario = pUsuario;
        this.contraseña = pContraseña;
        this.profesor = pProfesor; //Profesor.usuario (porque añadiendo el objeto entero podría comprometer la contraseña del profesor)
        this.nivel = pNivel; //nivel del alumno, "inicial" desde el registro o asignado por el profesor
        this.id = pID;
        this.ejercicios = []; //luego correremos una función que asigne los ejercicios del nivel pNivel que sean propuestos por el profesor pProfesor
        this.rol = "estudiante";
        this.ejsAsignados = 0; //para estadísticas
        this.ejsCompletos = 0; //para estadísticas
        this.ejsIncompletos = 0; //para estadísticas
        this.ejsConDevolucion = 0; //para estadísticas
    }
}

//clase Profesor
    class Profesor{
    constructor(pNombre, pUsuario, pContraseña, pID)
    {
        this.nombre = pNombre;
        this.usuario = pUsuario;
        this.contraseña = pContraseña;
        this.id = pID;
        this.rol = "profesor";
        this.alumnos = [];
        this.ejerciciosPlanteados = [];
    }
}

//clase Ejercicio
class Ejercicio {
    constructor(pTitulo, pLetra, pNivel, pProfesor, pImagen, pID, pIDDelPlanteo, pAudio, pDevolucion)
    {
        this.titulo = pTitulo; //creado por profesor
        this.letra = pLetra; //creado por profesor
        this.nivel = pNivel; //creado por profesor.
        this.profesor = pProfesor; //creado por profesor, esto se obtiene automáticamente del usuario logueado, los ejercicios se pueden filtrar a los alumnos en base al usuario que los creó
        this.imagen = pImagen;
        this.id = pID;
        this.idDelPlanteo = pIDDelPlanteo;
        this.audio = pAudio; //audio subido por alumno
        this.devolucion = pDevolucion; //devolución creada por el profesor
        this.completo = false; //bool para verificar si el ejercicio fue completado o no, falso por defecto
    }
}

let estudiantes = [];
let profesores = [];
let ejercicios = [];

//ejercicios.push( new Ejercicio (`${id del campo de titulo}, "id de descripcion", "id de nivel", "username profesor que crea el ejercicio") );

//OBJETOS PRE-CARGADOS EN LA PÁGINA
//PROFESORES
profesores.push( new Profesor ("Mario Robins", "mrobins", "Test1234!") );
profesores.push( new Profesor ("Juan Nieve", "jnieve", "Test1234!") );
profesores.push( new Profesor ("José Stalin", "jstalin", "Test1234!") );
profesores.push( new Profesor ("Laura Pausani", "lpausani", "Test1234!") );
profesores.push( new Profesor ("Jack Esparrow", "jesparrow", "Test1234!") );
//ESTUDIANTES
estudiantes.push( new Estudiante ("Pepe Pepo", "Pepe03", "Test1234!", 1, "inicial") );
estudiantes.push( new Estudiante ("René Russo", "Rolo02", "Test1234!", 2, "inicial") );
estudiantes.push( new Estudiante ("Pablo Escobas", "Pablo01", "Test1234!", 3, "intermedio") );
estudiantes.push( new Estudiante ("Martin Martinez", "Marti04", "Test1234!", 4, "intermedio") );
estudiantes.push( new Estudiante ("Pablo Coelo", "Pablo02", "Test1234!", 5, "avanzado") );
//EJERCICIOS, nota: pasamos audio y devolución vacíos
ejercicios.push( new Ejercicio ("Ejercicio 1, digitación 1", "Debe demostrar su velocidad digitando.", "inicial", 1, "<img src='imagenes/ej1.png' width='500'>", "", "", "") );
ejercicios.push( new Ejercicio ("Ejercicio 10, acordes 1","Debe demostrar que sabe los acordes básicos.", "inicial", 2, "<img src='imagenes/ej2.png' width='500'>", "", "", "" ) );
ejercicios.push( new Ejercicio ("Ejercicio 20, acordes 2", "Debe demostrar que sabe los acordes no tan básicos.", "intermedio", 3, "<img src='imagenes/ej3.png' width='500'>", "", "", "") );
ejercicios.push( new Ejercicio ("Ejercicio 30, digitación 2",  "Debe demostrar su velocidad digitando más rápido.", "intermedio", 4, "<img src='imagenes/ej4.png' width='500'>", "", "", "") );
ejercicios.push( new Ejercicio ("Ejercicio 40, sonidos raros 1", "Debe hacer sonidos raros con la guitarra.", "avanzado", 5, "<img src='imagenes/ej5.png' width='500'>", "", "", "", "") );

//Test estudiantes
estudiantes.push( new Estudiante ("Test1", "Test1", "Test1", 1, "inicial") );
estudiantes.push( new Estudiante ("Test2", "Test2", "Test2", 1, "intermedio") );
estudiantes.push( new Estudiante ("Test3", "Test3", "Test3", 1, "avanzado") );

//Test ejercicios sin completar
ejercicios.push( new Ejercicio ("Test Ejercicio 1, digitación 1", "Debe demostrar su velocidad digitando.", "inicial", 1, "<img src='imagenes/ej2.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 2, digitación 1", "Debe demostrar su velocidad digitando.", "inicial", 1, "<img src='imagenes/ej3.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 3, digitación 1", "Debe demostrar su velocidad digitando.", "inicial", 1, "<img src='imagenes/ej4.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 4, digitación 1.5", "La digitación en guitarra es lorem ipsum dolor sit amet, eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat est labo...", "inicial", 1, "<img src='imagenes/ej1.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 4, digitación 2", "Debe demostrar su velocidad digitando.", "intermedio", 1, "<img src='imagenes/ej5.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 5, digitación 3", "Debe demostrar su velocidad digitando.", "intermedio", 1, "<img src='imagenes/ej6.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 6, digitación 4", "Debe demostrar su velocidad digitando.", "avanzado", 1, "<img src='imagenes/ej7.png' width='500'>", "", "", "", "") );
ejercicios.push( new Ejercicio ("Test Ejercicio 7, digitación 5", "Debe demostrar su velocidad digitando.", "avanzado", 1, "<img src='imagenes/ej8.png' width='500'>", "", "", "", "") );
