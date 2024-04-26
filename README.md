## Prerequisites
- Node.js
- npm
- MySQL
- Postman
- VS Code
- Git
- GitHub

## How to setup and run the project
1. Clone the repository
```bash
git clone
```
2. Go to the project directory
```bash
cd
```
3. Install dependencies
```bash
npm install
```
4. Create a .env file in the root directory of the project and add the following
```bash
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=decadis_db
DB_PORT=3306
```

5. Create a database in MySQL
```bash
CREATE DATABASE express_project;
```
6. Import the database schema from the db.sql file
```bash
mysql -u root -p express_project < db.sql
```

```bash
FLUSH PRIVILEGES;
```

run the migration by knex
```bash
npx knex migrate:latest
```

7. Start the server
```bash
npm start
```
