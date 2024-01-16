# Project Monitor

<div align="center" > 
    <img alt="Status: In Development" src="https://img.shields.io/badge/Status-In%20Development-yellow"/>
    <img alt="Language: English" src="https://img.shields.io/badge/Language-English-yellow"/>
    <img alt="Rust" src="https://img.shields.io/badge/Rust-%5E1.75.0-orange" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-%5E4.0.0-blue"/>
    <img alt="React" src="https://img.shields.io/badge/React-%5E17.0.0-blue"/>
    <img alt="Tauri" src="https://img.shields.io/badge/Tauri-%5E1.5.8-darkblue"/>
    <img alt="Node" src="https://img.shields.io/badge/Node-%5E14.0.0-green"/>
    <img alt="Prettier" src="https://img.shields.io/badge/Prettier-Enabled-purple"/>
</div>

## Overview

Si quieres ver el README en español pulsa <a href="./docs/README-es.md">aquí</a>.

ProjectMonitor is a powerful development tool created to facilitate an agile development environment. This tool centralizes your projects, providing a unified platform for monitoring their states, launching, stopping, debugging, and establishing launch orders, among other functionalities. With a user-friendly interface, ProjectMonitor simplifies project management and enhances development efficiency.

## Key Features

- **Centralized Project Management:** Effortlessly manage multiple projects from a single interface.
  
- **Real-time Monitoring:** Keep track of project states in real-time, ensuring you stay informed about their status.

- **Launch and Stop Projects:** Easily launch and stop projects with just a few clicks.

- **Debugging Support:** Debug your projects seamlessly within the ProjectMonitor environment.

- **Launch Order Configuration:** Define and customize the launch order for your projects, ensuring a smooth and controlled workflow.

- **User-Friendly Interface:** ProjectMonitor boasts an intuitive and user-friendly interface, making project management a breeze.

- **Compability with technologies such as docker:** at the moment, the application supports only Docker as a secondary technology that can be launched with the proyect.

## Prerequisites

Before you can start developing with ProjectMonitor, you will need to have certain tools and dependencies downloaded. Aside from the IDE or code editor you use, we recommend using Visual Studio Code (VS Code). To develop with ProjectMonitor, you'll need the following utilities:

- Rust v1.75.0 (minimum)
- Node v18 - v20

Below are the installation processes for both, focused on Windows 10 and later.

##### Install Node

To install Node, you can do so from [the following URL](https://nodejs.org/en/download). We recommend installing the LTS version, as we anticipate versions beyond 20 should work.

##### Install Rust

To install Rust, you can follow the procedure below:

1. Download the `rustup` installer from [the official download page](https://rustup.rs/).

2. Run the installer and follow the on-screen instructions.

3. During the installation, select "Customize installation" if you want to change default options, such as adding Rust to the system PATH.

4. After the installation, open a new PowerShell window or restart your terminal.

5. To verify that Rust has been installed successfully, run:

   ```powershell
   rustc --version
   ```

# Development

Once you have the prerequisites installed and set up, you can proceed with the development process.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/moisesfm/project-monitor.git
   cd project-monitor
   ```

2. **Install all the dependencies:**
    ```bash
    npm install | npm i
    ```

3. **Run the project:**
    ```bash
    npm run dev
    ```

4. **Once you are done, build the project:**
    ```bash
    npm run build:win       // For Windows
    npm run build:mac       // For Mac OS
    npm run build:linux     // For Linux
    ```


In any case you need, you can check [here](https://tauri.app/v1/api/cli) the documentation of Tauri.