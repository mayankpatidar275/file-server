import { invoke } from "@tauri-apps/api/tauri";
import React, { useEffect, useRef, useState } from "react";

const ClientInput = ({ ip, port, setIp, setPort, handleFormSubmit }) => {
  const [discoveredServices, setDiscoveredServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [loader, setLoader] = useState(false);

  // Ref for the modal content
  const modalRef = useRef(null);

  // const handleIpChange = (e) => {
  //   setIp(e.target.value);
  // };

  // const handlePortChange = (e) => {
  //   setPort(e.target.value);
  // };

  const handleModalOpen = async () => {
    setShowServices(true); // Open modal first
    try {
      setLoader(true);
      const services = await invoke("start_discovering");
      const uniqueServices = services.reduce((acc, current) => {
        // const x = acc.find((item) => item.name === current.name);
        const x = acc.find(
          (item) =>
            item.addresses[0] === current.addresses[0] &&
            item.port === current.port
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setDiscoveredServices(uniqueServices);
    } catch (error) {
      console.error("Error starting discovery:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleServiceSelect = (service) => {
    setIp(service.addresses[0]); // Assuming the first address is the desired one
    setPort(service.port);
    setShowServices(false); // Close modal
    handleFormSubmit(); // Trigger the form submission
  };

  // Handle clicking outside the modal
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowServices(false); // Close modal
    }
  };

  useEffect(() => {
    if (showServices) {
      // Add event listener to detect clicks outside the modal
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Remove event listener when modal is closed
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showServices]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e); // Pass event to handleFormSubmit
        }}
        className="flex mx-auto w-full justify-center items-center space-x-4"
      >
        <div className="flex mx-auto w-full justify-center items-center space-x-4">
          <button
            type="button"
            onClick={handleModalOpen} // Open modal and trigger discovery
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Select Server
          </button>
          {ip && port && (
            <div>
              <strong>current: </strong>
              <span>
                {ip}:{port}
              </span>
              <button
                onClick={() => {
                  setIp("");
                  setPort("");
                }}
                className="m-3 underline"
              >
                clear
              </button>
            </div>
          )}
        </div>

        {/* <span>or</span>
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
        </button> */}
      </form>

      {showServices && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            ref={modalRef} // Attach the ref to the modal content
            className="bg-white p-6 rounded-lg shadow-lg w-[100%] max-w-md mx-auto relative"
          >
            <button
              onClick={() => setShowServices(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
            >
              &#x2715;
            </button>
            <h3 className="text-lg font-bold mb-4">Select Server</h3>
            {loader ? (
              "Please wait few seconds..."
            ) : (
              <ul className="space-y-2">
                {discoveredServices.length !== 0
                  ? discoveredServices.map((service, index) => (
                      <li key={index}>
                        {service.path}
                        <button
                          onClick={() => handleServiceSelect(service)}
                          className="text-blue-500 underline"
                        >
                          {service.addresses[0]}:{service.port}
                        </button>
                      </li>
                    ))
                  : "No server running"}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientInput;
