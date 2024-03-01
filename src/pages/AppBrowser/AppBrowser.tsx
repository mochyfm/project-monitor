import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import { Web } from '../../constants/app.constants'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import Dashboard from '../DashBoard'
import Dockers from '../Dockers/Dockers'
import Monitoring from '../Monitoring'
import Project from '../Project'
import ProjectsList from '../ProjectsList'
import NewProject from '../NewProject'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppBrowser() {
    const [nodeVersion, setNodeVersion] = useState<string>()

    useEffect(() => {
        const fetchData = async () => {
            const node_version = await invoke<string>('get_node_version').catch(
                (err) => {
                    console.error(err)
                    return ''
                },
            )
            setNodeVersion(node_version)
        }

        fetchData()
    }, [])

    return (
        <BrowserRouter basename='/'>
            <ToastContainer
                toastStyle={{ backgroundColor: 'var(--secondary-color)' }}
                draggable
                limit={1}
                closeOnClick
                hideProgressBar
                newestOnTop
                closeButton={false}
            />
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path={Web.dashboard.path} element={<Dashboard />} />
                    <Route
                        path={Web.projectsList.path}
                        element={<ProjectsList nodeVersion={nodeVersion} />}
                    />
                    <Route
                        path={Web.newProject.path}
                        element={<NewProject nodeVersion={nodeVersion} />}
                    />
                    <Route path={Web.project.path} element={<Project />} />
                    <Route path={Web.dockers.path} element={<Dockers />} />
                    <Route
                        path={Web.monitoring.path}
                        element={<Monitoring />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppBrowser
