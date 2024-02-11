import { CompatibleIDEs, CompatibleSDK } from "../types/interface.types";

export const renderPreferedIde = (ide : CompatibleIDEs) => {
    switch (ide) {
        case 'eclipse':
            return 'Eclipse IDE';
        case 'intellij':
            return 'IntelliJ IDEA';
        case 'intellij_community':
            return 'IntelliJ IDEA Community Edition';
        case 'sublime':
            return 'Sublime Text';
        case 'notepad_pp':
            return 'Notepad ++';
        case 'vscode':
            return 'Visual Studio Code';
        case 'vs_ide':
            return 'Visual Studio';
        default:
            return 'None';
        
    }
}

export const renderSdk = (sdk ?: CompatibleSDK) => {
    switch (sdk) {
        case 'node':
            return 'Node';
        case 'springboot':
            return 'Spring Boot';  
        case 'maven':
            return 'Maven'
        default:
            return 'unknown';  
    }
}