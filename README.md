# 💬 chat-backend

A simple REST API for a chat backend

## 📚 Description

This project consists of a basic TypeScript Node prototype for the backend portions of a chat app.

- 🟢 Swagger {···} -> http://localhost:8080/

- 🟠 Postman 🦸‍♀️ -> [Collection](./chat_backend.postman_collection.json)

  - Create and set the following variables in your environment:

    - `HOST`: (default) `localhost`
    - `PORT`: (default) `8080`
    - `access_token`: obtain it from the login endpoint

      - You can add the following snippet to the Tests tab to automate the process:

        ```javascript
        const jsonResponse = pm.response.json();
        const newAccessToken = jsonResponse.token;
        pm.environment.set("access_token", newAccessToken);
        ```

## 🌅 Getting Started

### 🔧 Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- ...

### 👨‍💻 Installing

To get started with the source code, please run the following steps:

1. Clone repository from GitHub:

   - Open your terminal and move to your desired folder to contain the project, then execute:

     `$ git clone https://github.com/MarianoAIglesias1994/chat-backend.git`

2. Move into the folder: `$ cd /`
3. Run npm install: `$ npm install`

### 🏃‍♂️ Executing

Once you have the previous configuration, you can head into these steps:

1. Make sure you have an `.env` file at project root level, with a content like the following example:

```
# Express Server
PORT=8080

# Passport
SECRET=M1_5up3r*Ul7R4-S3cRE7
BCRYPT_SALT_ROUNDS=12

# DB
STORAGE=./database/database.sqlite3

# Messages
MSG_LIMIT=100

```

### 🏭 Architecture

## 🆘 Help

In case of any issue don't hesitate to [contact me](mailto:miglesias@fi.uba.ar).

## ✍ Author

- [Mariano Iglesias](https://www.linkedin.com/in/mariano-agustin-iglesias/) -

## 📜 Version History

- 1.0.0
  - Initial Release

## TODO List - Next Steps

- Write README
- Unit Tests + Integration Tests
- Improve token generation -> add expiration time
- Improve health check mechanism
- Add validations for endpoints
- Update Swagger
- Add credentials for DB
- Improve Docker
- Add envs (dev, test, prod)
- Add k8s yaml
- Prettier + Eslint config
- Bundle into NPM package (?)
