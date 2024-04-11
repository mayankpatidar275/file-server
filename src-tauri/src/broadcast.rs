// src/broadcast.rs

use std::net::{IpAddr, Ipv4Addr, SocketAddr, UdpSocket};
use tokio::time::{sleep, Duration};

pub async fn start_broadcasting(port: u16) {
    let socket = UdpSocket::bind("0.0.0.0:0").expect("Failed to bind socket");
    socket.set_broadcast(true).expect("Failed to set broadcast");

    let broadcast_addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::BROADCAST), port);

    loop {
        let message = "Your broadcast message here";
        socket
            .send_to(message.as_bytes(), broadcast_addr)
            .expect("Failed to send broadcast");

        // Broadcast every 5 seconds
        println!("inside loop");
        sleep(Duration::from_secs(5)).await;
    }
}
