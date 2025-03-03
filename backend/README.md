
### Install dependencies
```bash
  yarn
  OR
  npm install
```
### Run app
```bash
  yarn dev
  OR
  npm run dev
```

### To run MongoDB using Docker, use the following command: 
```bash
docker run -d \
  --name nextstockdb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminpassword \
  -v mongo_data:/data/db \
  mongo:latest
```

#### Explanation of Flags:

- `-d` → Runs the container in detached mode (background).
- `--name raptaidb` → Names the container mongodb.
- `-p 27017:27017` → Maps MongoDB’s default port to the host machine.
- `-e MONGO_INITDB_ROOT_USERNAME=admin` → Sets the root username.
- `-e MONGO_INITDB_ROOT_PASSWORD=adminpassword` → Sets the root password.
- `-v mongo_data:/data/db` → Persists database data using a Docker volume.
- `mongo:latest` → Uses the latest MongoDB image.

### Connecting to MongoDB
You can connect to MongoDB using:
```bash
raptaidb://admin:adminpassword@localhost:27017
```

## RabbitMq
```bash
  docker run -d --name rabbitmq \
    -p 5672:5672 \
    -p 15672:15672 \
    -e RABBITMQ_DEFAULT_USER=myuser \
    -e RABBITMQ_DEFAULT_PASS=mypassword \
    rabbitmq:management
```

## redis
```bash
  docker run -d --name redis-server -p 6379:6379 redis
```