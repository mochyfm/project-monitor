import {
    CompatibleIDEs,
    CompatibleSDK,
    PageProps,
    ProgrammingLanguage,
} from './interface.types'

export type Collection = Project[]

export interface Project {
    id: string
    name: string
    launcheables: Launcheable[]
    dockerList?: DockerElement[]
}

export interface Launcheable {
    id?: string
    name?: string
    sdk?: CompatibleSDK
    sdkVersion?: string
    language?: ProgrammingLanguage
    preferedIde?: CompatibleIDEs
    path?: string
    scripts ?: Record<string, string>,
    launchFile ?: string;
}

export interface DockerElement {
    containerId: string
    name: string
    image: string
    version: string
}

/**
 * FORM TYPES
 */

export interface ProjectFormProps extends PageProps {
    mode: 'create' | 'edit'
}

export interface ProjectLauncheableProps extends Launcheable, PageProps {
    onDelete: (arg?: any) => any | void
    onEdit: (arg?: any) => any | void
}

/**
 * DATA TYPES
 */

// TypeScript types for the project content, which can be either XmlContent or JsonContent
interface ProjectContent {
    Xml?: XmlContent
    Json?: JsonContent
}

export interface ProjectPackageData {
    name: string
    content: ProjectContent
}

// TypeScript types for the XML content
export interface XmlContent {
    artifactId: string[]
    version: string[]
    [key: string]: string | string[]
}

// TypeScript types for the JSON content
export interface JsonContent {
    artifactId: string[]
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
    name: string
    private: boolean
    scripts: Record<string, string>
    version: string
}
