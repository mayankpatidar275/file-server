import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Modal from "react-modal";

const ClientInput = ({ ip, port, setIp, setPort, handleFormSubmit }) => {
  const [discoveredServices, setDiscoveredServices] = useState([]);
  const [showServices, setShowServices] = useState(false);

  const handleIpChange = (e) => {
    setIp(e.target.value);
  };

  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  useEffect(() => {
    const startDiscovering = async () => {
      try {
        console.log("discovering...");
        const services = await invoke("start_discovering");
        console.log("Discovered services:", services);
        const uniqueServices = services.reduce((acc, current) => {
          const x = acc.find((item) => item.name === current.name);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setDiscoveredServices(uniqueServices);
      } catch (error) {
        console.error("Error starting discovery:", error);
      }
    };

    startDiscovering();
  }, []);

  const handleServiceSelect = (service) => {
    setIp(service.addresses[0]); // Assuming the first address is the desired one
    setPort(service.port);
    setShowServices(false);
    handleFormSubmit(); // Trigger the form submission
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          value={ip}
          onChange={handleIpChange}
          placeholder="Enter IP Address"
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          type="text"
          value={port}
          onChange={handlePortChange}
          placeholder="Enter Port"
          className="border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded text-sm"
        >
          Start
        </button>
        <button
          type="button"
          onClick={() => setShowServices(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded text-sm"
        >
          Discovered Services
        </button>
      </form>

      <Modal
        isOpen={showServices}
        onRequestClose={() => setShowServices(false)}
        contentLabel="Discovered Services"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-4">Discovered Services:</h3>
          <ul className="space-y-2">
            {discoveredServices.map((service, index) => (
              <li key={index}>
                <button
                  onClick={() => handleServiceSelect(service)}
                  className="text-blue-500 underline"
                >
                  {service.addresses[0]}:{service.port}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowServices(false)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ClientInput;
