import { CompatibleIDEs, CompatibleSDK, ProgrammingLanguage } from "./interface.types";

export type Collection = Project[]

export interface Project {
  id: number;
  name: string;
  launcheables?: Launcheable[]
  dockerList?: DockerElement[]
}

export interface Launcheable {
  name?: string
  sdk: CompatibleSDK;
  language?: ProgrammingLanguage
  preferedIde?: CompatibleIDEs
  path?: string
}

export interface DockerElement {
  containerId: string
  name: string
  image: string
  version: string
}