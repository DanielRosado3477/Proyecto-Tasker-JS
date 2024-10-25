// Clase, función constructora, usar mayuscula por convension
class Usuario{
    constructor(username, password, mensaje){
    this.username = username
    this.password = password
    this.mensaje = mensaje;
    }
}

// Array USUARIOS e instansiación
let usuarios = [
    new Usuario("Pro", "ProUser12345", 
        //Mensaje de inicio de sesión Pro
        `Get full features and help 24/7
        
        US $4/month
        
        This plan includes:
        - Full features
        - No limits
        - Offline adding tasks
        - Support Desk 24/7`),
    
    new Usuario("Pay", "PayUser12344", 
        //Mensaje de inicio de sesión Pay
        `Get full features
        
        US $1.5/month
        
        This plan includes:
        - Full features
        - No limit team members
        - No limit projects at the time
        - Offline adding tasks`),
    
    new Usuario("Free", "FreeUser12345", 
        //Mensaje de inicio de sesión Free
        `Start with the basics
        
        US $0/month
        
        This plan includes:
        - Until 5 projects at the time
        - Online adding of tasks
        - Integration with your personal calendar
        - Until 4 members`)
];

// Verifica las credenciales, ambas deben ser identicas para obtener acceso
function verificarCredenciales(username, password) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username && usuarios[i].password === password) {
            return usuarios[i];
        }
    }
    return null; // Para credenciales son incorrectas
}

// Define el número de intentos que tiene el usuario para ingresar datos
function solicitarDatos() {
    let intentos = 2; // Se permite un máximo de 2 intentos (En un futuro al llegar al máximo se boqueara la cuenta)
    let nombreUsuario, contrasenaUsuario, usuarioValido;

    //Usamos while para asegurar que se corra por lo menos una vez el bucle y añadir la funcion bloqueante al llegar al maximo número de intentos
    while (intentos > 0) {
        nombreUsuario = prompt("Enter your username:");
        contrasenaUsuario = prompt("Enter your password:");

        //Llama a la función verificarCredenciales 
        usuarioValido = verificarCredenciales(nombreUsuario, contrasenaUsuario);

        if (usuarioValido) {
            alert("Login successed!\n You have access to:\n" + usuarioValido.mensaje);
            return;
        } else {
            // Elimina una unidad al contador y arroja mensaje
            intentos--;
            alert("Wrong credentials. You have " + intentos + " try left.");
        }

        // Mensaje final al llegar a 0 intentos
        if (intentos === 0) {
            alert(" You are run out of tries, please reload the page to try it again.");
        }
    }
}

// Llamada a la función para solicitar el login
solicitarDatos();
