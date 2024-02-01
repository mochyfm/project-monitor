import { Collection, DockerElement, Launcheable, Project } from '../types/application.types'

export const assignDataFromJson = (json: any): Collection => {
    return json.map((item: any) => {
        const { id, name, launcheables, dockerList } = item

        const project: Project = {
            id,
            name,
            launcheables: assignLauncheables(launcheables),
            dockerList: assignDockerList(dockerList),
        }
        return project
    })
}

// Función auxiliar para asignar datos a Launcheable
const assignLauncheables = (launcheables: any): Launcheable[] => {
    return launcheables.map((item: any) => {
        const { name, language, communityIDE, path } = item
        return { name, language, communityIDE, path }
    })
}

// Función auxiliar para asignar datos a DockerElement
const assignDockerList = (dockerList: any): DockerElement[] => {
    return dockerList.map((item: any) => {
        const { containerId, name, image, version } = item
        return { containerId, name, image, version }
    })
}
