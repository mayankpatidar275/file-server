// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod broadcast;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn start_broadcasting(port: u16) {
    println!("inside start_broadcasting");
    broadcast::start_broadcasting(port).await;
}

fn main() {
    // Prevents additional console window on Windows in release, DO NOT REMOVE!!
    #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_broadcasting])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
