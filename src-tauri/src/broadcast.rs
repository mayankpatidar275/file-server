use lazy_static::lazy_static;
use mdns_sd::{ServiceDaemon, ServiceInfo};
use std::sync::{Arc, Mutex};

// Define a global variable to hold the ServiceDaemon instance
lazy_static! {
    static ref MDNS: Arc<Mutex<Option<ServiceDaemon>>> = Arc::new(Mutex::new(None));
    // Variable to hold the full name of the registered service
    static ref FULL_NAME: Arc<Mutex<Option<String>>> = Arc::new(Mutex::new(None));
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
    let service_type = "_dufs-mdns._udp.local.";
    let instance_name = "dufs";
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
        .register(my_service.clone()) // Cloning the service before registering
        .expect("Failed to register our service");

    println!("Service registered successfully ");

    // Store the full name of the registered service
    let full_name = my_service.get_fullname().to_owned();
    *FULL_NAME.lock().unwrap() = Some(full_name.clone());
}

// Note: if you turn off the wifi and turn on (in mobile) the app wont be able to discover if you have already run stop_broadcasting function, otherwise it will again discover. It will discover even if you run stop_broadcasting function unless you didn't turn off the wifi.
pub async fn stop_broadcasting() {
    // Gracefully shutdown the daemon
    std::thread::sleep(std::time::Duration::from_secs(1));

    // Acquire lock on MDNS
    let mut mdns_guard = MDNS.lock().unwrap();

    // Retrieve the full name of the registered service
    let full_name = FULL_NAME.lock().unwrap().clone();

    println!("full_name : {:?} service unregistering...", full_name);

    // Unregister with the daemon, which publishes the service.
    if let Some(full_name) = &full_name {
        mdns_guard
            .as_mut()
            .unwrap()
            .unregister(full_name)
            .expect("Failed to unregister our service");
    }

    // Shut down the daemon if it's created
    if let Some(mdns) = mdns_guard.take() {
        mdns.shutdown().unwrap();
    }
}
