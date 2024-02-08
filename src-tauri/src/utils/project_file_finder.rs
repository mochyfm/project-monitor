use std::collections::HashMap;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};
use serde::Serialize;
use serde_json::Value;
use xml::reader::{EventReader, XmlEvent};

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
        if let Ok(content) = read_xml_file(&file_path) {
            return Some(ProjectFile { name: file_name, content });
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

pub fn read_xml_file(file_path: &Path) -> Result<HashMap<String, Value>, Box<dyn std::error::Error>> {
    let file_content = fs::read_to_string(file_path)?;
    let parser = EventReader::from_str(&file_content);
    let mut content_map = HashMap::new();
    let mut current_key = String::new();
    let mut current_value = String::new();

    for event in parser {
        match event {
            Ok(XmlEvent::StartElement { name, .. }) => {
                current_key = name.local_name.clone();
            }
            Ok(XmlEvent::Characters(chars)) => {
                current_value = chars;
            }
            Ok(XmlEvent::EndElement { .. }) => {
                // Insertar los valores en la estructura de datos
                content_map.entry(current_key.clone()).or_insert(Value::Null);
                if let Some(entry) = content_map.get_mut(&current_key) {
                    if let Value::String(existing_value) = entry {
                        // Concatenar valores si ya existe una cadena
                        *existing_value += &current_value;
                    } else {
                        // Establecer el valor si es la primera vez que se encuentra la clave
                        *entry = Value::String(current_value.clone());
                    }
                }
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
