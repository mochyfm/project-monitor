import { ProgrammingLanguage } from "./interface.types";

export type Collection = Project[]

export interface Project {
  id: number;
  name: string
  launcheables?: Launcheable[]
  dockerList?: DockerElement[]
}

export interface Launcheable {
  name?: string
  language?: ProgrammingLanguage
  preferedIde?: string
  path?: string
}

export interface DockerElement {
  containerId: string
  name: string
  image: string
  version: string
}