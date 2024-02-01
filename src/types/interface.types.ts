import { IconType } from 'react-icons'
import { DockerElement, Launcheable } from './application.types'

export type ProgrammingLanguage =
    | 'JavaScript'
    | 'Java'
    | 'C'
    | 'Cpp'
    | 'Go'
    | 'Dart'
    | 'Python'
    | 'TypeScript'
    | 'Swift'
    | 'Kotlin'
    | 'Ruby'
    | 'Rust'
    | 'PHP'
    | 'Shell'
    | 'Scala'
    | 'Perl'
    | 'Other';

export type CompatibleIDEs = 'vscode' | 'intellij' | 'intellij_community' | 'eclipse' | 'sublime' | 'notepad_pp' | 'vs_ide'
export type CompatibleSDK = 'node' | 'springboot';


export interface LeftNavbarButtonOptions {
    name: string
    link?: string
    icon?: IconType | null
}

export interface CardProperties {
    projectName: string
    projectLanguage: ProgrammingLanguage;
    preferedIDE: string
}

export interface ProjectMonitorParams {
    className?: string
}

export interface ProjectListCardProperties {
    id: number
    name: string
    launcheables?: Launcheable[]
    dockers?: DockerElement[]
    node_version: string;
}

