use mdns_sd::{ServiceDaemon, ServiceInfo};
// use std::collections::HashMap;

pub async fn start_broadcasting() {
    // Create a daemon
    let mdns = ServiceDaemon::new().expect("Failed to create daemon");

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

    // Register with the daemon, which publishes the service.
    mdns.register(my_service)
        .expect("Failed to register our service");

    // Gracefully shutdown the daemon
    std::thread::sleep(std::time::Duration::from_secs(1));
    mdns.shutdown().unwrap();
}
