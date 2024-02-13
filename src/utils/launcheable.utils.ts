import { ProjectTechnologies } from "../types/application.types"

export const groupDependenciesByTechnology = (
    dependencies: Record<string, string>,
): Record<string, Record<string, string> | string> => {
    const groupedDependencies: Record<string, Record<string, string> | string> =
        {}

    // Crear un mapa para contar las ocurrencias de cada tecnología
    const technologyCounts: Record<string, number> = {}

    // Iterar sobre las dependencias para contar las ocurrencias de cada tecnología
    for (const dependencyName in dependencies) {
        if (dependencies.hasOwnProperty(dependencyName)) {
            // Obtener el prefijo común (por ejemplo, "@angular") de la dependencia
            const prefix = dependencyName.split('/')[0]
            const technology =
                prefix.charAt(0) === '@' ? prefix.slice(1) : prefix

            // Contar las ocurrencias de la tecnología
            technologyCounts[technology] =
                (technologyCounts[technology] || 0) + 1
        }
    }

    // Iterar sobre las dependencias para agruparlas por tecnología
    for (const dependencyName in dependencies) {
        if (dependencies.hasOwnProperty(dependencyName)) {
            // Obtener el prefijo común (por ejemplo, "@angular") de la dependencia
            const prefix = dependencyName.split('/')[0]
            const technology =
                prefix.charAt(0) === '@' ? prefix.slice(1) : prefix

            // Agrupar las dependencias con más de una ocurrencia
            if (technologyCounts[technology] > 1) {
                if (!groupedDependencies[technology]) {
                    groupedDependencies[technology] = {}
                }

                ;(groupedDependencies[technology] as Record<string, string>)[
                    dependencyName
                ] = dependencies[dependencyName]
            } else {
                // Dejar las dependencias con una sola ocurrencia como están
                groupedDependencies[dependencyName] =
                    dependencies[dependencyName]
            }
        }
    }

    return groupedDependencies
}

export const detectArchitecture = (dependencies: Record<string, string>): ProjectTechnologies | null => {
    // Definimos los frameworks principales de frontend y backend
    const frontendFrameworks = ['astro', 'react', 'preact', 'vue', 'svelte', 'next', 'angular'];
    const backendFrameworks = ['express', 'nestjs', 'fastify'];

    // Buscamos el framework principal
    let technology: string | null = null;

    // Priorizamos la búsqueda de los frameworks de frontend
    for (const framework of frontendFrameworks) {
        if (Object.keys(dependencies).some(dependency => dependency.includes(framework))) {
            technology = framework;
            break;
        }
    }

    // Si no se encontró un framework de frontend, buscamos uno de backend
    if (!technology) {
        // Primero, intentamos detectar Nest.js
        if (Object.keys(dependencies).some(dependency => dependency.startsWith('@nestjs/'))) {
            technology = 'nestjs';
        } else {
            // Si no se encontraron dependencias de Nest.js, buscamos otros frameworks de backend
            for (const framework of backendFrameworks) {
                if (Object.keys(dependencies).some(dependency => dependency.includes(framework))) {
                    technology = framework;
                    break;
                }
            }
        }
    }

    return technology as ProjectTechnologies | null;
}

export const detectDependencies = (dependencies: Record<string, string>): string[] | null => {
    // Definimos las librerías más populares
    const popularLibraries: string[] = [
        'typescript', 
        'tailwind', 
        'axios', 
        'jquery', 
        'lodash', 
        'bootstrap', 
        'react-router-dom', 
        'vue-router', 
        'react-redux', 
        '@angular/core',
        // Puedes agregar más bibliotecas populares aquí...
    ];

    // Buscamos las librerías populares en las dependencias
    const foundLibraries: string[] = [];
    for (const dependency in dependencies) {
        for (const library of popularLibraries) {
            if (dependency.includes(library)) {
                foundLibraries.push(library);
                break;
            }
        }
    }

    // Devolvemos las librerías encontradas, si hay alguna
    return foundLibraries.length > 0 ? foundLibraries : null;
}













