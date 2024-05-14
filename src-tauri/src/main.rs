// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod broadcast;
mod discover;

use discover::DiscoveredService; // Import the DiscoveredService struct

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn start_broadcasting(instance_name: String, port: u16) {
    println!("inside start_broadcasting");
    broadcast::register_mdns_service("_dufs._udp", &instance_name, port, false);
}

#[tauri::command]
async fn stop_broadcasting(instance_name: String, port: u16) {
    print!("iside stop_broadcasting");
    broadcast::register_mdns_service("_dufs._udp", &instance_name, port, true);
}

#[tauri::command]
async fn start_discovering() -> Vec<DiscoveredService> {
    println!("Inside start_discovering");

    // Assuming the service type is constant, you can hardcode it here
    let service_type = "_dufs._udp".to_string(); // Replace "_my-service._udp" with your desired constant service type

    let discovered_services = discover::start_discovering(service_type.clone());

    println!(
        "Discovered services in Tauri command: {:?}",
        discovered_services
    );

    discovered_services
}

fn main() {
    // Prevents additional console window on Windows in release, DO NOT REMOVE!!
    #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
    env_logger::init();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_broadcasting,
            stop_broadcasting,
            start_discovering
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
