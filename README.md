# digital_envision_test
<!-- ABOUT THE PROJECT -->
## About The Project
This is DIGITAL ENVISION coding test for backend developer

### Built With
* [expressjs](https://expressjs.com/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

install npm, pm2 and mysql
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
3. export dump**.sql
   
4. run the microservices `
   ```js
   pm2 start receiver.yml
   ```
5. run worker init `
   ```js
   pm2 start worker_init.yml
   ```
6. run worker sender `
   ```js
   pm2 start worker_sender.yml
   ```
7. save pm2 node`
   ```js
   pm2 save
   ```
   
<!-- USAGE EXAMPLES -->
## Usage
1. to access microservices use this credential : 
   basic auth admin : supersecretadmin
2. export postman collection (digital_envision_test.postman_collection.json) to test microservices

<!-- USAGE EXAMPLES -->
## Flow Explanation
1. microservices will do CRUD for data users
2. every day at 1 AM worker init will save every users data that have equal birthday date whith current date
3. every minute worker sender will send birthday messages to users who has the same local time to 9 AM
