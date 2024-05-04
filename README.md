---

# File server

Welcome to File server project! This project is a desktop application built using Tauri, a framework for building lightweight, native desktop applications using web technologies.

## Overview

File server consists of two main sections: the **Server** section and the **Client** section.

- **Server Section**: In this section, users can configure the server by providing the required configurations and clicking the start button to create a new server instance. The backend server is built using [Dufs](https://github.com/sigoden/dufs), a Rust-based server.

- **Client Section**: In the client section, users can enter the IP address and port of the server from which they want to fetch file folders.


![Client Section](/public/demo-assets/client1.png)

![Server Section](/public/demo-assets/server1.png)

## Technologies Used

- **Tauri**: The desktop application framework used for building the project.
- **React.js**: Utilized for the frontend development.
- **Tailwind CSS**: Used for styling the user interface.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/mayankpatidar275/file-server.git
   ```

2. **Navigate and Install Dependencies**

   ```
   cd file-server
   npm install
   ```

3. **Start the Tauri desktop app**

   ```
   npm run tauri dev
   ```

## Contributing

Contributions are welcome! If you'd like to contribute to the project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
