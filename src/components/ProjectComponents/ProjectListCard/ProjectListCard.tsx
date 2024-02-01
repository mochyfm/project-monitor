import { ProjectListCardProperties } from '../../../types/interface.types'
import './ProjectListCard.css'
import { Launcheable } from '../../../types/application.types'
import LauncheableCard from '../../LauncheableCard'

const ProjectListCard = (props: ProjectListCardProperties) => {
    const { id, name, launcheables, node_version } = props

    return (
        <>
            <div className='projectListCardBody' key={id}>
                <h1 className='projectListProjectName'>{name}</h1>
                <hr />
                <h3 className='projectLauncheablesName'>Launcheables</h3>
                <div className='projectListCardLauncheables'>
                    {launcheables &&
                        launcheables.map(
                            (launcheable: Launcheable, index: number) => {
                                return (
                                    <LauncheableCard
                                        sdk={launcheable.sdk}
                                        node_version={node_version}
                                        key={index}
                                        path={launcheable.path}
                                        name={launcheable.name}
                                        language={launcheable.language}
                                        preferedIde={launcheable.preferedIde}
                                    />
                                )
                            },
                        )}
                </div>
            </div>
        </>
    )
}

export default ProjectListCard
