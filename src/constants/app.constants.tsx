import Dashboard from '../pages/DashBoard'
import Dockers from '../pages/Dockers/Dockers'
import Monitoring from '../pages/Monitoring'
import Project from '../pages/Project'
import ProjectsList from '../pages/ProjectsList'

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
    dockers: {
        path: '/dockers',
        component: <Dockers />,
    },
    monitoring: {
        path: '/monitoring',
        component: <Monitoring />,
    },
}
