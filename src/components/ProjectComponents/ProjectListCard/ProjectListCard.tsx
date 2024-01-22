import { ProjectListCardProperties } from '../../../types/interface.types'
import './ProjectListCard.css'
import { Launcheable } from '../../../types/application.types'
import LauncheableCard from '../../LauncheableCard'

const ProjectListCard = (props: ProjectListCardProperties) => {
    const { id, name, launcheables, dockers } = props

    return (
        <>
            <div className='projectListCardBody' key={id}>
                <h1 className='projectListProjectName'>{name}</h1>
                <div className='projectListCardLauncheables'>
                    {launcheables && launcheables.map((launcheable: Launcheable, index : number) => {
                        return (
                            <LauncheableCard
                                key={index}
                                name={launcheable.name}
                                language={launcheable.language}
                                preferedIde={launcheable.preferedIde}
                            />
                        )
                    })}
                </div>
                <div></div>
            </div>
        </>
    )
}

export default ProjectListCard
