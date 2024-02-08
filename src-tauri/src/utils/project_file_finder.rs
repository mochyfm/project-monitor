use std::collections::HashMap;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};
use serde::Serialize;
use serde_json::{self, Value};


#[derive(Debug, Serialize)]
pub struct ProjectFile {
    name: String,
    content: HashMap<String, Value>,
}
#[tauri::command]
pub fn find_project_file(path: &str) -> Option<ProjectFile> {
    let project_root = PathBuf::from(path);

    // Intentar encontrar el archivo package.json
    if let Some(file_name) = find_file_in_directory(&project_root, "package.json") {
        let file_path = project_root.join(&file_name);
        if let Ok(content) = read_json_file(&file_path) {
            return Some(ProjectFile { name: file_name, content });
        }
    }

    // Intentar encontrar el archivo pom.xml
    if let Some(file_name) = find_file_in_directory(&project_root, "pom.xml") {
        let file_path = project_root.join(&file_name);
        if let Ok(content) = read_json_file(&file_path) {
            return Some(ProjectFile { name: file_name, content });
        }
    }

    None
}

fn find_file_in_directory(directory: &PathBuf, file_name: &str) -> Option<String> {
    let file_path = directory.join(file_name);
    if file_path.exists() {
        return Some(file_name.to_string());
    }
    None
}


pub fn read_json_file(file_path: &Path) -> Result<HashMap<String, serde_json::Value>, serde_json::Error> {
    let file_content = fs::read_to_string(file_path)
        .map_err(|err| serde_json::Error::io(io::Error::new(io::ErrorKind::Other, err)))?; // Convertir std::io::Error a serde_json::Error
    let json: HashMap<String, serde_json::Value> = serde_json::from_str(&file_content)?;
    Ok(json)
}
