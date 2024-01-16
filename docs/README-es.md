# Project Monitor

<div align="center" > 
    <img alt="Estado: En desarrollo" src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow"/>
    <img alt="Idioma: Spanish" src="https://img.shields.io/badge/Language-Spanish-yellow"/>
    <img alt="Rust" src="https://img.shields.io/badge/Rust-%5E1.75.0-orange" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-%5E4.0.0-blue"/>
    <img alt="React" src="https://img.shields.io/badge/React-%5E17.0.0-blue"/>
    <img alt="Tauri" src="https://img.shields.io/badge/Tauri-%5E1.5.8-darkblue"/>
    <img alt="Node" src="https://img.shields.io/badge/Node-%5E14.0.0-green"/>
    <img alt="Prettier" src="https://img.shields.io/badge/Prettier-Habilitado-purple"/>
</div>

## Vista General

If you want the README in english, click <a href="https://github.com/mochyfm/project-monitor">here</a>.

ProjectMonitor es una potente herramienta de desarrollo creada para facilitar un entorno ágil de desarrollo. Esta herramienta centraliza tus proyectos, proporcionando una plataforma unificada para monitorear sus estados, lanzar, detener, depurar y establecer órdenes de lanzamiento, entre otras funcionalidades. Con una interfaz fácil de usar, ProjectMonitor simplifica la gestión de proyectos y mejora la eficiencia del desarrollo.

## Características Clave

-   **Gestión Centralizada de Proyectos:** Gestiona sin esfuerzo múltiples proyectos desde una sola interfaz.
-   **Monitoreo en Tiempo Real:** Realiza un seguimiento de los estados de los proyectos en tiempo real, asegurándote de estar informado sobre su estado.

-   **Lanzamiento y Detención de Proyectos:** Lanza y detén proyectos fácilmente con solo unos clics.

-   **Soporte de Depuración:** Depura tus proyectos de manera fluida dentro del entorno de ProjectMonitor.

-   **Configuración de Orden de Lanzamiento:** Define y personaliza el orden de lanzamiento para tus proyectos, asegurando un flujo de trabajo suave y controlado.

-   **Interfaz Amigable para el Usuario:** ProjectMonitor cuenta con una interfaz intuitiva y fácil de usar, haciendo que la gestión de proyectos sea muy sencilla.

-   **Compatibilidad con tecnologías como Docker:** Actualmente, la aplicación solo es compatible con Docker como una tecnología secundaria que puede ser lanzada con el proyecto.

## Pre-requisitos

Antes de poder desarrollar nada con ProjectMonitor, necesitarás tener ciertas herramientas y elementos descargados. Quitando herramientas como el IDE o editor de código que uses, recomendamos como es obvio utilizar Visual Studio Code (VS Code). Para poder desarrollar con ProjectMonitor necesitarás tener las siguientes utilidades:

-   Rust v1.75.0 (mínimo)
-   Node v18 - v20

A continuación te dejamos los procesos de instalación para ambos, enfocados desde Windows 10 en adelante.

##### Instalar Node

Para instalar node puedes hacerlo desde [la siguiente url](https://nodejs.org/en/download), recomendamos instalar la version LTS, ya estimamos que las versiones posteriores a la 20 deberían funcionar.

##### Instalar Rust

Para poder instalar rust puedes seguir el siguiente procedimiento:

1. Descarga el instalador de `rustup` desde [la página de descargas oficial](https://rustup.rs/).

2. Ejecuta el instalador y sigue las instrucciones en pantalla.

3. Durante la instalación, selecciona "Customize installation" si deseas cambiar las opciones predeterminadas, como agregar Rust al PATH del sistema.

4. Después de la instalación, abre una nueva ventana de PowerShell o reinicia tu terminal.

5. Para verificar que Rust se ha instalado correctamente, ejecuta:

    ```powershell
    rustc --version
    ```

## Desarrollo

Una vez tengas los prerequisitos instalados y preparados, puede realizar el procedimiento para empezar a desarrollar

1. **Clona el Repositorio:**

    ```bash
    git clone https://github.com/moisesfm/project-monitor.git
    cd project-monitor
    ```

2. **Instala todas las dependencias:**

    ```bash
    npm install | npm i
    ```

3. **Ejecuta el proyecto:**

    ```bash
    npm run dev
    ```

4. **Una vez que hayas terminado, construye el proyecto:**

    ```bash
    npm run build:win       // Para Windows
    npm run build:mac       // Para Mac OS
    npm run build:linux     // Para Linux
    ```

En caso de que lo necesitases, puedes acceder [aquí](https://tauri.app/v1/api/cli) a toda la documentación de tauri.