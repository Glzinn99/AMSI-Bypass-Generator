# AMSI Bypass Generator - GitHub Page

## Descripción del Proyecto

Este repositorio contiene una página web alojada en GitHub Pages que proporciona información detallada sobre el módulo **AMSI (Antimalware Scan Interface)** y las diversas técnicas utilizadas para **bypassearlo**. La página cuenta con un generador aleatorio de código que permite evadir la detección de Windows Defender y otros sistemas de seguridad, evitando que el código generado coincida con firmas predefinidas.

## ¿Qué es AMSI?

**AMSI (Antimalware Scan Interface)** es una interfaz de escaneo integrada en Windows que permite a los productos antivirus inspeccionar scripts y contenido en ejecución en busca de amenazas potenciales. AMSI es particularmente efectivo en la detección de código ofuscado en PowerShell, JavaScript, VBScript y macros de Office.

## Objetivo del Proyecto

Este proyecto tiene como finalidad la investigación y el aprendizaje sobre la seguridad ofensiva y las metodologías utilizadas para evadir AMSI. Mediante el uso de diversas técnicas, se generan cargas de código que no coinciden con las firmas de detección de Windows Defender, permitiendo su ejecución sin ser bloqueadas.

⚠ **Aviso Legal:** Este proyecto está destinado exclusivamente para fines educativos y de investigación en seguridad ofensiva. No se debe utilizar con fines malintencionados o en sistemas sin autorización.

## Características Principales

- **Generador de AMSI Bypass:** Genera código aleatorio para evadir AMSI y evitar detecciones por firma.
- **Variabilidad en los Payloads:** Gracias a la aleatorización del código, es más difícil para Windows Defender identificarlo como una amenaza.
- **Diferentes Técnicas de Bypass:** Implementa métodos como:
    - Manipulación de funciones de AMSI.dll
    - Ofuscación de strings y payloads
    - Modificación en memoria de AMSI
    - Carga de ensamblados en tiempo de ejecución
- **Interfaz intuitiva:** Diseño minimalista y atractivo con estética de terminal.

## Tecnologías Utilizadas

- **HTML, CSS y JavaScript:** Para la estructura y diseño de la web.
- **GitHub Pages:** Para alojar y distribuir la página de forma accesible.
- **Bootstrap & Tailwind CSS:** Para la estilización y responsividad.
- **Codemirror.js:** Para resaltar sintaxis en el generador de código.

## Instalación y Uso

1. Clonar el repositorio:
    
```bash
git clone https://github.com/d1se0/AMSI-Bypass-Generator.git
```
    
2. Abrir el archivo `index.html` en un navegador.
3. Acceder a la versión en GitHub Pages:
    - [Ver Página](LINK)
4. Generar código de bypass y estudiar las diferentes técnicas implementadas.

## Contribuciones

Las contribuciones son bienvenidas. Para agregar nuevas técnicas de bypass o mejorar el diseño, sigue estos pasos:

1. Realiza un **fork** del repositorio.
2. Crea una rama con la mejora:
    
    ```bash
    git checkout -b feature/nueva-mejora
    ```
    
3. Realiza los cambios y envía un pull request.

## Contacto

Si tienes dudas o sugerencias, puedes contactarme a través de:

- GitHub: [d1se0]([https://github.com/D1se0](https://github.com/D1se0))
- Gmail: [ciberseguridad12345@gmail.com](mailto:ciberseguridad12345@gmail.com)

---

### ⚠ Disclaimer / Exención de Responsabilidad

Este proyecto es exclusivamente con fines educativos. No me hago responsable del uso indebido que se le pueda dar. Usar este conocimiento de manera ética y responsable.

---
