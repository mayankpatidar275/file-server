// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod broadcast;
mod discover;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn start_broadcasting() {
    println!("inside start_broadcasting");
    broadcast::start_broadcasting().await;
}

#[tauri::command]
async fn start_discovering() {
    println!("inside start_discovering");
    discover::start_discovering().await;
}

fn main() {
    // Prevents additional console window on Windows in release, DO NOT REMOVE!!
    #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_broadcasting,
            start_discovering
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
