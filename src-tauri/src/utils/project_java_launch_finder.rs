use std::fs;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;
use std::io::BufRead;

#[tauri::command]
pub fn find_java_main(root_dir: &Path) -> Option<PathBuf> {
    let mut java_files = vec![];

    // Recorrer los archivos en el directorio raíz del proyecto
    for entry in WalkDir::new(root_dir) {
        if let Ok(entry) = entry {
            if entry.file_type().is_file() && entry.path().extension() == Some("java".as_ref()) {
                java_files.push(entry.path().to_path_buf());
            }
        }
    }

    // Si hay más de un archivo Java, buscar el que se llame "Application.java"
    if java_files.len() > 1 {
        if let Some(application_file) = java_files.iter().find(|&path| path.file_name().map_or(false, |name| name.to_string_lossy().contains("Application.java"))) {
            return Some(application_file.clone());
        }
    }

    // Si solo hay un archivo Java o no se encontró "Application.java", buscar un archivo con método main
    if let Some(file) = java_files.first() {
        if contains_main_method(file) {
            return Some(file.clone());
        }
    }

    None
}

// Función para verificar si un archivo Java contiene un método main
fn contains_main_method(file_path: &Path) -> bool {
    if let Ok(file) = fs::File::open(file_path) {
        let reader = std::io::BufReader::new(file);
        for line in reader.lines() {
            if let Ok(line) = line {
                if line.contains("public static void main(String[]") {
                    return true;
                }
            }
        }
    }
    false
}