# 8Ball-Pool
> Open source 8-Ball Pool server and game in Typescript

# Setup

Clone the repo
```
$ git clone https://github.com/jamesql/8Ball-Pool.git
```

Install Typescript
```
$ npm i typescript -g
```

Run npm install
```
$ npm i
```

Compile game
```
$ npx webpack
```

Run the server
```
$ ts-node ./
```

## File Structure
    ./src
    ├── server                  # WS Server
    ├── util                    # Utility / Typescript types
    ├── web                     # Game Typescript and assets
    └── index.ts
    ./start_server.cmd          # Start Server & Build Scripts
    ./Dockerfile                # Docker container file

### LICENSE
> This project is currently using an MIT License. For more information please read `LICENSE`