/** Esto sirve para poder activar el menu hamburguesa */
// Obtener elementos del DOM
const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

// Abrir el menú al hacer clic en el botón hamburguesa
burger.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

// Cerrar el menú al hacer clic en la "X"
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Cerrar el menú si se hace clic fuera de él
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});


// Copiar codigo de terminal

document.addEventListener("DOMContentLoaded", function() {
    const copyBtn = document.getElementById("copyBtnTerminal");
    const copiedText = document.getElementById("copiedText");
    const outputDiv = document.getElementById("PowerShellOut"); // Obtener el div

    copyBtn.addEventListener("click", function() {
        if (outputDiv) {
            const textToCopy = outputDiv.innerText || outputDiv.textContent; // Obtener el contenido del div

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Ocultar la imagen
                copyBtn.style.display = 'none';

                // Mostrar el texto "Copied!"
                copiedText.style.visibility = 'visible';
                copiedText.style.opacity = '1';

                // Después de 2 segundos, ocultar el texto y mostrar la imagen
                setTimeout(() => {
                    copiedText.style.opacity = '0';
                    setTimeout(() => {
                        copiedText.style.visibility = 'hidden'; // Esconde el texto
                    }, 500); // Espera un poco antes de ocultar el texto

                    copyBtn.style.display = 'block'; // Vuelve a mostrar la imagen
                }, 2000);
            }).catch(err => console.error("Error copying text: ", err));
        } else {
            console.error("El div con id 'PowerShellOut' no existe.");
        }
    });
});


/*
// Esto es de los botones de generacion de la terminal
function GeneratePS() {
    document.getElementById('PowerShellOut').value = 'Generated PowerShell command';
}

function GenerateEncPS() {
    document.getElementById('PowerShellOut').value = 'Generated Encoded PowerShell command';
}
*/

// Función de copiar para múltiples mini terminales
function copyToClipboard(event) {
    const button = event.target; // El botón de copia que fue clickeado
    const terminal = button.closest('.mini-terminal'); // Encuentra la terminal más cercana
    const commandOutput = terminal.querySelector('.terminal-body').textContent.trim(); // Obtiene el texto del terminal
    const copiedText = terminal.querySelector('.copied-text');

    navigator.clipboard.writeText(commandOutput).then(() => {
        copiedText.style.visibility = 'visible';
        copiedText.style.opacity = '1'; // Hacer visible el mensaje
        button.style.display = 'none'; // Ocultar el botón de copia

        // Ocultar después de 2 segundos con animación
        setTimeout(() => {
            copiedText.style.opacity = '0'; // Animación de desvanecimiento
            setTimeout(() => {
                copiedText.style.visibility = 'hidden'; // Esconder realmente el texto
                button.style.display = 'block'; // Volver a mostrar el botón de copia
            }, 500); // Esperar a que termine la animación antes de ocultarlo completamente
        }, 2000);
    }).catch(err => console.error("Error al copiar: ", err));
}

// Agregar evento a todos los botones de copiar
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', copyToClipboard);
    });
});


// COLORES

/*function GeneratePS() {
    // Obtenemos el payload generado por codeScript.js
    const command = getPayload(); 
    
    // Guardamos en el textarea oculto para copiar el texto sin formato
    document.getElementById("PowerShellOutRaw").value = command;
    
    // Aplicamos formato y mostramos en el div
    document.getElementById("PowerShellOut").innerHTML = formatPowerShell(command);
}

function GenerateEncPS() {
    document.getElementById("PowerShellOut").innerHTML = "<span class='command'>Función</span> <span class='parameter'>de comando codificado aún no implementada.</span>";
}

// Función que aplica el formato con los nuevos colores
function formatPowerShell(command) {
    return command
        .replace(/(\bSetValue|Set|GetType|GetField|Get|Remove|Start|Stop|Restart|Enable|Disable\b)/g, '<span class="command">$1</span>')  // 🟡 Cmdlets
        .replace(/(-\w+)/g, '<span class="parameter">$1</span>')  // ⚪ Parámetros
        .replace(/(\b\d+\b|\bTrue\b|\bFalse\b)/g, '<span class="value">$1</span>')  // 🔴 Números, True/False
        .replace(/('[^']+')/g, '<span class="string">$1</span>');  // 🟢 Strings
}*/

//----------------------------------------------------


function GeneratePS() {
    // Obtenemos el payload generado por codeScript.js
    const command = getPayload(); 
    
    // Guardamos en el textarea oculto para copiar el texto sin formato
    document.getElementById("PowerShellOutRaw").value = command;
    
    // Aplicamos formato y mostramos en el div con etiquetas <pre><code> para preservar el formato
    //document.getElementById("PowerShellOut").innerHTML = `<pre><code>${formatPowerShell(command)}</code></pre>`;
    document.getElementById("PowerShellOut").innerHTML = formatPowerShell(command);
}


//----------------------------------------------------

function GenerateEncPS() {

    // Codigo antiguo -->
    /*
    // Obtener el payload generado por codeScript.js
    const command = getPayload();
    
    // Convertir el payload a binario (esto genera la cadena binaria codificada)
    const binaryPayload = toBinary(command);
    
    // Crear el comando con la estructura para la decodificación Base64
    const encodedCommand = `[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String("${binaryPayload}")) | iex`;
    
    // Aplicar los colores y formato
    const formattedCommand = formatPowerShell(encodedCommand);
    
    // Mostrar el comando en el div PowerShellOut
    document.getElementById("PowerShellOut").innerHTML = formattedCommand;*/

    // Codigo moderno -->

    // Obtenemos el payload generado por codeScript.js
    const command = getPayload(); 

    // Pasar el payload a Base64
    const commandCoded =  `${randomCase("[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String(")}"${toBinary(command)}"))|iex`

    // Guardamos en el textarea oculto por si se quiere copiar el texto sin formato
    document.getElementById("PowerShellOutRaw").value = commandCoded;

    // Mostrar el comando en el div PowerShellOut
    document.getElementById("PowerShellOut").innerHTML = formatPowerShell(commandCoded);
}



// Función que aplica formato PowerShell con mayor precisión
function formatPowerShell(command) {
    return command
        // 🟣 Comentarios (líneas que empiezan con #)
        .replace(/#(.*)$/gm, '<span class="comment">#$1</span>')  

        // 🟡 **Cmdlets de PowerShell** (Negrita y amarillo)
        .replace(/\b(Get|Set|Remove|Start|Stop|Restart|Enable|Disable|New|Out|Write|ForEach|Where|Select|Invoke|Measure|Format|Import|Export|Convert|Test|iex)-[A-Za-z0-9]+\b/g, '<span class="command"><b>$&</b></span>')

        // ⚪ **Parámetros** (Negrita y gris) --> (-Force, -Path, -Confirm)
        .replace(/(-[A-Za-z0-9]+)/g, '<span class="parameter"><b>$1</b></span>')  

        // 🔵 **Tipos de datos y clases** ([System.String], [Byte], [Char], etc.)
        .replace(/\[\s*([A-Za-z0-9_\.]+)\s*\]/g, '<span class="datatype">[$1]</span>')  

        // 🔴 **Números, True y False** (Ej: `123`, `True`, `False`)
        .replace(/\b(True|False|\d+)\b/g, '<span class="value">$1</span>')  

        // 🟣 **Operadores** (-eq, -ne, -gt, -lt, -like, -match, etc.)
        .replace(/\b(-eq|-ne|-gt|-lt|-ge|-le|-like|-match|-notmatch|-contains|-notcontains|-in|-notin|using)\b/g, '<span class="operator">$1</span>')   

        // 🟠 Variables ($variable)
        .replace(/\$(\w+)/g, '<span class="variable">$$$1</span>')
        
        // 🟢 Solo Strings entre comillas simples ('texto')
        .replace(/'([^']+)'/g, '<span class="string">\'$1\'</span>');  
}

// Animacion de escribir y borrar tipo terminal

/*
let isAnimating = false; // Variable para controlar el estado de la animación
let isAnimationEnabled = true; // Por defecto, la animación está activada

// Obtener el control deslizante
const slider = document.getElementById('animation-toggle');

// Agregar un evento al slider para activar o desactivar la animación
slider.addEventListener('input', function() {
    isAnimationEnabled = slider.value === '1'; // Si el slider está en 1, desactivamos la animación
});

function showTerminalEffect(button, isEncoded = false) {
    // Comprobar si la animación está desactivada
    if (!isAnimationEnabled || isAnimating) return; // Si la animación está desactivada o en curso, no hacer nada

    isAnimating = true; // Iniciar la animación

    const overlay = button.nextElementSibling; // Encuentra el span al lado del botón
    const container = button.closest('.copy-container'); // Contenedor principal
    const text = isEncoded ? "Codigo codificado con exito!" : "Codigo generado con exito!"; // Texto a mostrar
    let index = 0;

    // Deshabilitar ambos botones mientras la animación esté en curso
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    // Mostrar la superposición
    overlay.style.display = "block";
    overlay.textContent = "";

    // Asegurar que el contenedor se expanda para permitir que el texto se muestre
    container.style.height = "auto";  // Esto permite que el div crezca a medida que se escribe

    // Copiar al portapapeles
    navigator.clipboard.writeText(text).catch(err => console.error("Error al copiar: ", err));

    // Escritura tipo terminal
    function typeWriter() {
        if (index < text.length) {
            overlay.textContent += text[index];
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Después de escribir el texto, comenzar a borrar
            setTimeout(deleteWriter, 1000);
        }
    }

    // Borrar texto tipo terminal
    function deleteWriter() {
        if (overlay.textContent.length > 0) {
            overlay.textContent = overlay.textContent.slice(0, -1);
            setTimeout(deleteWriter, 50);
        } else {
            // Vuelve la altura del contenedor a su estado inicial
            container.style.height = ""; // Vuelve a su altura original
            overlay.style.display = "none";

            // Volver a habilitar los botones después de que la animación termine
            buttons.forEach(btn => btn.disabled = false);

            isAnimating = false; // Finaliza la animación
        }
    }

    typeWriter();
}
*/

let isAnimating = false; // Variable para controlar el estado de la animación
let isAnimationEnabled = true; // Por defecto, la animación está activada

// Obtener el checkbox y el texto de estado
const slider = document.getElementById('animation-toggle');
const statusText = document.getElementById('animation-status');

// Agregar un evento al checkbox para alternar el estado
slider.addEventListener('change', function() {
    isAnimationEnabled = slider.checked; // Si el slider está marcado, la animación está habilitada
    // Cambiar el texto dinámicamente
    statusText.textContent = isAnimationEnabled ? "Animación Activada" : "Animación Desactivada";
});

function showTerminalEffect(button, isEncoded = false) {
    // Comprobar si la animación está desactivada
    if (!isAnimationEnabled || isAnimating) return; // Si la animación está desactivada o en curso, no hacer nada

    isAnimating = true; // Iniciar la animación

    const overlay = button.nextElementSibling; // Encuentra el span al lado del botón
    const container = button.closest('.copy-container'); // Contenedor principal
    const text = isEncoded ? "Codigo codificado con exito!" : "Codigo generado con exito!"; // Texto a mostrar
    let index = 0;

    // Deshabilitar ambos botones mientras la animación esté en curso
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    // Mostrar la superposición
    overlay.style.display = "block";
    overlay.textContent = "";

    // Asegurar que el contenedor se expanda para permitir que el texto se muestre
    container.style.height = "auto";  // Esto permite que el div crezca a medida que se escribe

    // Copiar al portapapeles
    navigator.clipboard.writeText(text).catch(err => console.error("Error al copiar: ", err));

    // Escritura tipo terminal
    function typeWriter() {
        if (index < text.length) {
            overlay.textContent += text[index];
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Después de escribir el texto, comenzar a borrar
            setTimeout(deleteWriter, 1000);
        }
    }

    // Borrar texto tipo terminal
    function deleteWriter() {
        if (overlay.textContent.length > 0) {
            overlay.textContent = overlay.textContent.slice(0, -1);
            setTimeout(deleteWriter, 50);
        } else {
            // Vuelve la altura del contenedor a su estado inicial
            container.style.height = ""; // Vuelve a su altura original
            overlay.style.display = "none";

            // Volver a habilitar los botones después de que la animación termine
            buttons.forEach(btn => btn.disabled = false);

            isAnimating = false; // Finaliza la animación
        }
    }

    typeWriter();
}







