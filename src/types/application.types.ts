export type Collection = Project[]

export interface Project {
  name: string
  launcheables?: Launcheable[]
  dockerList?: DockerElement[]
}

export interface Launcheable {
  name?: string
  language?: string
  communityIDE?: string
  path?: string
}

export interface DockerElement {
  containerId: string
  name: string
  image: string
  version: string
}