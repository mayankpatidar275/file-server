use lazy_static::lazy_static;
use mdns_sd::{ServiceDaemon, ServiceInfo};
use std::sync::{Arc, Mutex};

// Define a global variable to hold the ServiceDaemon instance
lazy_static! {
    static ref MDNS: Arc<Mutex<Option<ServiceDaemon>>> = Arc::new(Mutex::new(None));
}

pub async fn start_broadcasting() {
    // Acquire lock on MDNS
    let mut mdns_guard = MDNS.lock().unwrap();

    // Create a daemon if it's not already created
    if mdns_guard.is_none() {
        let mdns = ServiceDaemon::new().expect("Failed to create daemon");
        *mdns_guard = Some(mdns);
    }

    // Create a service info.
    let service_type = "_mdns-sd-my-test._udp.local.";
    let instance_name = "my_instance";
    let ip = "192.168.1.12";
    let host_name = "192.168.1.12.local.";
    let port = 5200;
    let properties = [("property_1", "test"), ("property_2", "1234")];

    let my_service = ServiceInfo::new(
        service_type,
        instance_name,
        host_name,
        ip,
        port,
        &properties[..],
    )
    .unwrap();
    println!("my service: {:?}", my_service);
    // Register with the daemon, which publishes the service.
    mdns_guard
        .as_mut()
        .unwrap()
        .register(my_service)
        .expect("Failed to register our service");

    println!("Service registered successfully ");
}

pub async fn stop_broadcasting() {
    // Gracefully shutdown the daemon
    std::thread::sleep(std::time::Duration::from_secs(1));

    // Acquire lock on MDNS
    let mut mdns_guard = MDNS.lock().unwrap();

    // Shut down the daemon if it's created
    if let Some(mdns) = mdns_guard.take() {
        mdns.shutdown().unwrap();
    }
}
