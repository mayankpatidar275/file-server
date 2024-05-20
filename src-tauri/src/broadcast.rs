use mdns_sd::{DaemonEvent, ServiceDaemon, ServiceInfo};
use std::{thread, time::Duration};

pub fn register_mdns_service(service_type: &str, instance_name: &str, port: u16, unregister: bool) {
    let mdns = ServiceDaemon::new().expect("Could not create service daemon");

    // Create a service info.
    let service_type = format!("{}.local.", service_type);
    let service_hostname = format!("{}{}", instance_name, &service_type);
    // let port = 3456;
    let properties = [("PATH", "one"), ("Path", "two"), ("PaTh", "three")];
    let service_info = ServiceInfo::new(
        &service_type,
        instance_name,
        &service_hostname,
        "",
        port,
        &properties[..],
    )
    .expect("valid service info")
    .enable_addr_auto();

    let monitor = mdns.monitor().expect("Failed to monitor the daemon");
    let service_fullname = service_info.get_fullname().to_string();

    // Register with the daemon, which publishes the service.

    mdns.register(service_info)
        .expect("Failed to register mDNS service");

    println!("Registered service {}.{}", instance_name, service_type);

    if unregister {
        let wait_in_secs = 2;
        println!("Sleeping {} seconds before unregister", wait_in_secs);
        thread::sleep(Duration::from_secs(wait_in_secs));

        let receiver = mdns.unregister(&service_fullname).unwrap();
        while let Ok(event) = receiver.recv() {
            println!("unregister result: {:?}", event);
        }
    } else {
        // Optionally, monitor daemon events
        while let Ok(event) = monitor.recv() {
            println!("Daemon event: {:?}", event);
            if let DaemonEvent::Error(e) = event {
                println!("Failed: {}", e);
                break;
            }
        }
    }
}
