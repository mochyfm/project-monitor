import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import { Web } from '../../constants/app.constants'

function AppBrowser() {
    useEffect(() => {
        console.log('Cargo')
    }, [])

    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path={Web.dashboard.path} element={Web.dashboard.component} />
                    <Route path={Web.projectsList.path} element={Web.projectsList.component} />
                    <Route path={Web.newProject.path} element={Web.newProject.component} />
                    <Route path={Web.project.path} element={Web.project.component} />
                    <Route path={Web.dockers.path} element={Web.dockers.component} />
                    <Route path={Web.monitoring.path} element={Web.monitoring.component} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppBrowser
