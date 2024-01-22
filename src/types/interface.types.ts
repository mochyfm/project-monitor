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
}

export type LauncheableCardProps = Launcheable
