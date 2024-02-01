// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::Path, process::Command};

#[derive(Debug, serde::Serialize)]
struct FolderInfo {
    carpeta: String,
    archivos: Vec<String>,
}

#[tauri::command]
fn get_node_version() -> Result<String, String> {
    let output = Command::new("node").arg("-v").output();

    match output {
        Ok(output) => {
            if output.status.success() {
                let version = String::from_utf8_lossy(&output.stdout);
                Ok(version.trim().to_string())
            } else {
                let error_message = String::from_utf8_lossy(&output.stderr);
                eprintln!("Error ejecutando 'node -v': {}", error_message);
                Err(error_message.trim().to_string())
            }
        }
        Err(err) => Err(err.to_string()), // Convertir std::io::Error a String
    }
}

#[tauri::command]
fn list_files_in_folders(target_path: &str) -> Result<Vec<FolderInfo>, String> {
    let path = Path::new(target_path);

    // Verificar si la ruta existe y es un directorio
    if path.is_dir() {
        let mut folder_list = Vec::new();

        // Iterar sobre los elementos dentro del directorio
        if let Ok(entries) = fs::read_dir(path) {
            for entry in entries {
                if let Ok(entry) = entry {
                    if entry.path().is_dir() {
                        // Es una carpeta
                        let folder_name = entry.file_name().to_string_lossy().into_owned();
                        let folder_path = entry.path();
                        let files = list_files_in_folder(&folder_path)?;

                        let folder_info = FolderInfo {
                            carpeta: folder_name,
                            archivos: files,
                        };

                        folder_list.push(folder_info);
                    }
                }
            }

            Ok(folder_list)
        } else {
            Err("Error al leer el directorio".to_string())
        }
    } else {
        Err("La ruta no es un directorio válido".to_string())
    }
}

fn list_files_in_folder(folder_path: &Path) -> Result<Vec<String>, String> {
  fs::read_dir(folder_path)
      .map_err(|err| format!("Error al leer la carpeta {:?}: {}", folder_path, err))
      .and_then(|entries| {
          entries
              .map(|entry| entry.and_then(|e| Ok(e.file_name().to_string_lossy().into_owned())))
              .collect::<Result<Vec<_>, _>>()
              .map_err(|err| format!("Error al recopilar nombres de archivo: {}", err))
      })
}


#[tauri::command]
fn test_comms() {
    println!("Tauri Communication works!");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test_comms, get_node_version, list_files_in_folders])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
