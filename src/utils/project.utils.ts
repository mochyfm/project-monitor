import { Command } from '@tauri-apps/api/shell'
import {
    CompatibleIDEs,
    CompatibleSDK,
    ProgrammingLanguage,
} from '../types/interface.types'
import { sendNotification } from '@tauri-apps/api/notification'
import { detectArchitecture, detectDependencies } from './launcheable.utils'

export const renderPreferedIde = (ide: CompatibleIDEs) => {
    switch (ide) {
        case 'eclipse':
            return 'Eclipse IDE'
        case 'intellij':
            return 'IntelliJ IDEA'
        case 'intellij_community':
            return 'IntelliJ IDEA Community Edition'
        case 'sublime':
            return 'Sublime Text'
        case 'notepad_pp':
            return 'Notepad ++'
        case 'vscode':
            return 'Visual Studio Code'
        default:
            return 'None'
    }
}

function tieneEspacios(path: string) {
    const partes = path.split('\\')
    for (let parte of partes) {
        if (parte.includes(' ')) {
            return true
        }
    }
    return false
}

function selectIdeCommandToLaunch(ide?: CompatibleIDEs) {
    switch (ide) {
        case 'intellij_community':
        case 'intellij':
            return 'idea'
        case 'vscode':
            return 'code'
        case 'eclipse':
            return 'eclipse'
        case 'notepad_pp':
            return 'notepad++'
        case 'sublime':
            return 'subl'
        default:
            return 'code'
    }
}

export const openIde = (path?: string, ide?: CompatibleIDEs, sdk?: string) => {
    const ideCommandToLaunch = selectIdeCommandToLaunch(ide)
    if (path && !tieneEspacios(path)) {
        console.log(`Launching IDE: ${ideCommandToLaunch}`)
        const ideLaunchCommand = new Command(
            'cmd',
            ['/c', `start /B /MIN ${ideCommandToLaunch} .`],
            { cwd: path },
        )
        try {
            ideLaunchCommand.execute()
            sendNotification({
                title: `Launching ${ide ? renderPreferedIde(ide) : `...`}`,
                icon: `../../src/assets/icons/sdk/${sdk}.png`,
                body: 'Opening in a new tab',
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const renderSdk = (sdk?: CompatibleSDK | ProgrammingLanguage) => {
    switch (sdk) {
        case 'node':
            return 'Node'
        case 'springboot':
            return 'Spring Boot'
        case 'maven':
            return 'Maven'
        default:
            return 'unknown'
    }
}

export const renderLanguage = (fileName?: string): ProgrammingLanguage => {
    const lastDotIndex = fileName!.lastIndexOf('.')
    if (lastDotIndex === -1) {
        return 'Other'
    }
    const extension = fileName!.substring(lastDotIndex + 1).toLowerCase()

    switch (extension) {
        case 'js':
        case 'mjs':
            return 'JavaScript'
        case 'java':
            return 'Java'
        case 'c':
            return 'C'
        case 'cpp':
            return 'Cpp'
        case 'go':
            return 'Go'
        case 'dart':
            return 'Dart'
        case 'py':
            return 'Python'
        case 'ts':
            return 'TypeScript'
        case 'swift':
            return 'Swift'
        case 'kt':
            return 'Kotlin'
        case 'rb':
            return 'Ruby'
        case 'rs':
            return 'Rust'
        case 'php':
            return 'PHP'
        case 'sh':
            return 'Shell'
        case 'scala':
            return 'Scala'
        case 'pl':
            return 'Perl'
        default:
            return 'Other'
    }
}

export const retrieveLaunchFile = (fullPath: string): string => {
    const nombreArchivo = fullPath.match(/[^\\\/]*$/)?.[0]
    return nombreArchivo ? nombreArchivo : ' NOT FOUND '
}

export const removeExtension = (input: string): string => {
    const lastDotIndex = input.lastIndexOf('.')
    if (lastDotIndex === -1) {
        return input
    }
    return input.substring(0, lastDotIndex)
}


export const detectProjectLanguage = (dependencies: Record<string, string>, devDependencies: Record<string, string>): string => {
    const dependenciesList = detectDependencies(dependencies) || [];
    const devDependenciesList = detectDependencies(devDependencies) || [];

    // Comprobamos si alguna de las dependencias es TypeScript
    const isTypeScriptProject = dependenciesList.includes('typescript');
    const isTypeScriptDevProject = devDependenciesList.includes('typescript');

    if (isTypeScriptProject || isTypeScriptDevProject) {
        return 'TypeScript';
    }

    // Si no hay dependencias TypeScript, determinamos el lenguaje basado en la arquitectura del proyecto
    const architecture = detectArchitecture(dependencies);
    if (architecture === 'angular' || architecture === 'nestjs') {
        return 'TypeScript';
    }

    return 'JavaScript';
}

export const getFileLanguage = (filename?: string): ProgrammingLanguage | undefined => {
    const extensionsToLanguages: { [key: string]: ProgrammingLanguage } = {
        'py': 'Python',
        'js': 'JavaScript',
        'java': 'Java',
        'ts': 'TypeScript',
        'c': 'C',
        'cpp': 'Cpp',
        'php': 'PHP',
        'rb': 'Ruby',
        'rs': 'Rust',
        'go': 'Go',
        'swift': 'Swift',
        'kt': 'Kotlin',
        'pl': 'Perl',
        // Agrega más extensiones y lenguajes aquí según sea necesario
    };

    const extension = filename && getFileExtension(filename);
    if (extension && extensionsToLanguages.hasOwnProperty(extension)) {
        return extensionsToLanguages[extension];
    } else {
        return undefined;
    }
}

export const getFileExtension = (filename?: string): string | undefined => {
    const lastDotIndex = filename!.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === filename!.length - 1) {
        return undefined; // No hay extensión
    }
    return filename!.slice(lastDotIndex + 1);
}