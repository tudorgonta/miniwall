FROM alpine

# Install Node.js and npm
RUN apk add --update nodejs npm

# Create and set the working directory
WORKDIR /src

# Copy your application files to the container
COPY . /src

# Install any dependencies if required (if you have a package.json file)
RUN npm install

# Add env entries to the .env file
RUN echo "DB_URL=mongodb+srv://admin:Qewrt123@cluster0.ptmtcon.mongodb.net/MiniWall?retryWrites=true&w=majority" > .env
RUN echo "JWT_TOKEN=858f70baee76c91a4f235be78e55d1ea99b0dde2a73d1e73dac3c324909a2805" >> .env
RUN echo "PORT=3000" >> .env

# Set the exposed port
EXPOSE 3000

# Specify the entry point command to start the Node.js application
ENTRYPOINT ["node", "./app.js"]