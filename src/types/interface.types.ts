import { IconType } from 'react-icons'
import { Launcheable, Project } from './application.types'

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

export type CompatibleIDEs = 'vscode' | 'intellij' | 'intellij_community' | 'eclipse' | 'sublime' | 'notepad_pp'
export type CompatibleSDK = 'node' | 'springboot' | 'maven';

export interface PageProps {
    nodeVersion ?: string;
}

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

export interface ProjectListCardProperties extends Project, PageProps {
}

export interface LauncheableCardProps extends Launcheable, PageProps {
}
