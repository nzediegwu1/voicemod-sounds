# base image 
FROM node:12-alpine

# Arguments to be passed during build
ARG DATABASE_URL

# Set environment varibles
ENV REACT_APP_BASE_URL http://localhost:4000
ENV DATABASE_URL=${DATABASE_URL}

# the working directory where the application would be started
WORKDIR /app
# The Yarn.lock and package.json file is copied so that the versions 
# in the package.json are not upgraded from what is present in the 
# local package.json to a higher version in the container image.
COPY yarn.lock /app
COPY package.json /app
# After the package.json is copied,
# all dependencies are then installed with this command
RUN yarn
COPY . . 
RUN yarn install-deps

EXPOSE 3000

CMD [ "yarn", "start" ]
