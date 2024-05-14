use mdns_sd::{ServiceDaemon, ServiceEvent, ServiceInfo};
use serde::Serialize;
use std::sync::{Arc, Mutex};

#[derive(Debug, Clone, Serialize)]
pub struct DiscoveredService {
    pub name: String,
    pub host: String,
    pub port: u16,
    pub addresses: Vec<String>,
    pub properties: Vec<(String, String)>,
}

pub fn start_discovering(service_type: String) -> Vec<DiscoveredService> {
    println!("Starting service discovery for type: {}", &service_type);

    let mdns = ServiceDaemon::new().expect("Failed to create daemon");

    let mut service_type_with_domain = service_type.clone();
    service_type_with_domain.push_str(".local.");

    println!("Browsing for service type: {}", &service_type_with_domain);

    let receiver = mdns
        .browse(&service_type_with_domain)
        .expect("Failed to browse");

    let discovered_services: Arc<Mutex<Vec<DiscoveredService>>> = Arc::new(Mutex::new(Vec::new()));
    let discovered_services_clone = discovered_services.clone();

    // let now = Instant::now();
    while let Ok(event) = receiver.recv() {
        match event {
            ServiceEvent::ServiceResolved(info) => {
                println!("Service resolved: {:?}", &info);

                let discovered_service = DiscoveredService {
                    name: info.get_fullname().to_string(),
                    host: info.get_hostname().to_string(),
                    port: info.get_port(),
                    addresses: info
                        .get_addresses()
                        .iter()
                        .map(|addr| addr.to_string())
                        .collect(),
                    properties: extract_properties(&info),
                };

                println!("Discovered service: {:?}", &discovered_service);

                discovered_services_clone
                    .lock()
                    .unwrap()
                    .push(discovered_service);
            }
            _ => {}
        }
    }

    let discovered_services = discovered_services.lock().unwrap();
    println!("Discovered services: {:?}", discovered_services);
    discovered_services.clone()
}

fn extract_properties(info: &ServiceInfo) -> Vec<(String, String)> {
    info.get_properties()
        .iter()
        .flat_map(|prop| {
            let key = prop.key().to_string();
            let value = prop.val_str().to_string();
            vec![(key, value)]
        })
        .collect()
}
