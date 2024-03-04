import './ProjectListCard.css'; // Importa el archivo de estilos CSS
import { ProjectListCardProperties } from '../../../types/interface.types';
import { Launcheable } from '../../../types/application.types';
import LauncheableCard from '../../LauncheableCard';

const ProjectListCard = (props: ProjectListCardProperties) => {
    const { id, name, launcheables, nodeVersion } = props;

    return (
        <div className='projectListCardBody' key={id}>
            <h1 className='projectListProjectName'>{name}</h1>
            <hr />
            <h3 className='projectLauncheablesName'>Launcheables</h3>
            <div className='projectListCardLauncheables'>
                {launcheables &&
                    launcheables.map((launcheable: Launcheable, index: number) => (
                        <LauncheableCard
                            proWatcher={launcheable.proWatcher}
                            sdk={launcheable.sdk}
                            nodeVersion={nodeVersion}
                            key={index}
                            path={launcheable.path}
                            name={launcheable.name}
                            language={launcheable.language}
                            preferedIde={launcheable.preferedIde}
                            edited={launcheable.edited}
                            architecture={launcheable.architecture}
                            dependencies={launcheable.dependencies}
                            id={launcheable.id}
                            launchFile={launcheable.launchFile}
                            mainPath={launcheable.mainPath}
                            script={launcheable.script}
                            scripts={launcheable.scripts}
                            sdkVersion={launcheable.sdkVersion}
                            structure={launcheable.structure}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProjectListCard;
