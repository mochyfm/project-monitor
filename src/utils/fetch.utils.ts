import { invoke } from '@tauri-apps/api'
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import Constants from '../constants/options.constants'

export const findProjectFile = async (path: string) => {
  return await invoke('find_project_file', { path })
}

export const getProjects = async () => {
    try {
      const contents = await readTextFile(Constants.savedProjectsFile, {
        dir: BaseDirectory.Resource,
      });
      const parsedContent = JSON.parse(contents);
      return parsedContent;
    } catch (error) {
      console.error('Error al leer el archivo de proyectos:', error);
      throw error; 
    }
  };

export const findFileFromPath = async (file_path: File) => {
    return await invoke('find-file', { file_path })
}
