import { useEffect, useState } from 'react'
import './Dashboard.css'
import { Collection } from '../../types/application.types'
import Constants from '../../constants/options.constants'
import { resolveResource } from '@tauri-apps/api/path'
import { readTextFile } from '@tauri-apps/api/fs'

const Dashboard = () => {
    const [collection, setCollection] = useState<Collection | null>(null)

    useEffect(() => {
        const fetchOptions = async () => {
            const settingsFile = Constants.settings_file

            try {
                const resourcePath = await resolveResource(settingsFile)
                const collection: Collection = JSON.parse(
                    await readTextFile(resourcePath),
                )
                console.log(collection)
                console.log(typeof collection)
                setCollection(collection)
            } catch (error: any) {
                console.error(error)
            }
        }
        fetchOptions()
    }, [])

    return <div className='dashboard'>Dashboard</div>
}

export default Dashboard
