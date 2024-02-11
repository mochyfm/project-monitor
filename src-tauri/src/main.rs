// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
mod utils;

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
fn test_comms() {
    println!("Tauri Communication works!");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            test_comms,
            get_node_version,
            utils::project_file_finder::find_project_file,
            utils::project_java_launch_finder::find_java_main
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
