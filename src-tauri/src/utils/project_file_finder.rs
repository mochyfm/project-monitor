use std::collections::HashMap;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};
use serde::{Serialize, Deserialize};
use xml::reader::{EventReader, XmlEvent};

#[derive(Debug, Serialize, Deserialize)]
pub enum ProjectContent {
    Json(HashMap<String, serde_json::Value>),
    Xml(HashMap<String, Vec<String>>),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectFile {
    name: String,
    content: ProjectContent,
}

#[tauri::command]
pub fn find_project_file(path: &str) -> Option<ProjectFile> {
    let project_root = PathBuf::from(path);

    // Intentar encontrar el archivo package.json
    if let Some(file_name) = find_file_in_directory(&project_root, "package.json") {
        let file_path = project_root.join(&file_name);
        if let Ok(content) = read_json_file(&file_path) {
            return Some(ProjectFile { name: file_name, content: ProjectContent::Json(content) });
        }
    }

    // Intentar encontrar el archivo pom.xml
    if let Some(file_name) = find_file_in_directory(&project_root, "pom.xml") {
        let file_path = project_root.join(&file_name);
        if let Ok(content) = read_xml_file(&file_path) {
            return Some(ProjectFile { name: file_name, content: ProjectContent::Xml(content) });
        }
    }

    None
}

pub fn read_json_file(file_path: &Path) -> Result<HashMap<String, serde_json::Value>, serde_json::Error> {
    let file_content = fs::read_to_string(file_path)
        .map_err(|err| serde_json::Error::io(io::Error::new(io::ErrorKind::Other, err)))?; // Convertir std::io::Error a serde_json::Error
    let json: HashMap<String, serde_json::Value> = serde_json::from_str(&file_content)?;
    Ok(json)
}

pub fn read_xml_file(file_path: &Path) -> Result<HashMap<String, Vec<String>>, Box<dyn std::error::Error>> {
    let file_content = fs::read_to_string(file_path)?;
    let parser = EventReader::from_str(&file_content);
    let mut content_map = HashMap::new();
    let mut current_key = String::new();
    let mut current_values = Vec::new();

    for event in parser {
        match event {
            Ok(XmlEvent::StartElement { name, .. }) => {
                current_key = name.local_name.clone();
                current_values.clear(); // Limpiar los valores actuales para la nueva clave
            }
            Ok(XmlEvent::Characters(chars)) => {
                current_values.push(chars);
            }
            Ok(XmlEvent::EndElement { .. }) => {
                // Insertar los valores en la estructura de datos
                content_map.entry(current_key.clone()).or_insert(Vec::new()).extend(current_values.clone());
            }
            Err(e) => return Err(Box::new(e)),
            _ => {}
        }
    }

    Ok(content_map)
}

fn find_file_in_directory(directory: &PathBuf, file_name: &str) -> Option<String> {
    let file_path = directory.join(file_name);
    if file_path.exists() {
        return Some(file_name.to_string());
    }
    None
}