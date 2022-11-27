# DESCRIPTION:      Docker file for 8Ball-Pool
# AUTHOR:           James Ash <ashj@wit.edu>

# Alpine Linux base image
FROM alpine:latest

# Install NodeJS & Npm
RUN apk add --no-cache nodejs npm

# Set work directory
WORKDIR /8ball

# Copy source to workdir
COPY . /8ball

# Install deps
RUN npm install

# Ports
EXPOSE 80 
EXPOSE 8080
EXPOSE 1337
EXPOSE 3306

# Start Application
ENTRYPOINT [ "ts-node" ]

CMD ["./"]