import Dashboard from '../pages/DashBoard'
import Dockers from '../pages/Dockers/Dockers'
import Monitoring from '../pages/Monitoring'
import Project from '../pages/Project'
import ProjectsList from '../pages/ProjectsList'
import NewProject from '../pages/NewProject'

export const Web = {
    dashboard: {
        path: '/',
        component: <Dashboard />,
    },
    projectsList: {
        path: '/projectsList',
        component: <ProjectsList />,
    },
    project: {
        path: '/project/:id',
        component: <Project />,
    },
    newProject: {
        path: '/project/new',
        component: <NewProject />
    },
    dockers: {
        path: '/dockers',
        component: <Dockers />,
    },
    monitoring: {
        path: '/monitoring',
        component: <Monitoring />,
    },
}
