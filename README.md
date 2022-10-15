# digital_envision_test
<!-- ABOUT THE PROJECT -->
## About The Project
This is DIGITAL ENVISION coding test for backend developer

### Built With
* [expressjs](https://expressjs.com/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

install npm and pm2 and mysql
* npm
  ```sh
  npm install npm@latest -g
  
* pm2
  ```sh
  npm install pm2 -g
  
* mysql
  ```sh
  sudo apt install mysql-server
  
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/andiyusanto/digital_envision_test.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. run the microservices `
   ```js
   pm2 start receiver.yml
   ```
4. run init worker`
   ```js
   pm2 start worker_init.yml
   ```
5. run sender worker `
   ```js
   pm2 start worker_sender.yml
   ```
   
<!-- USAGE EXAMPLES -->
## Usage
to acces the microservices use this credential : 
basic auth admin : supersecretadmin
