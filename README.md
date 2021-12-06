# Voicemod-Sounds

## Installation
1. Clone this repository into your local machine using:
```
git clone https://github.com/nzediegwu1/voicemod-sounds.git
```
## Dev Deployment
This is done using Docker, with the following steps:
1. Build your docker image using: `docker build -t voicemod --build-arg DATABASE_URL=<DATABASE_URL> .`
2. Ensure your `DATABASE_URL` build-arg is a `hosted` MongoDB URI
3. Run docker image using: `docker run -it --rm -p 3000:3000 -p 4000:4000 voicemod`
4. On your browser, goto `http://localhost:3000` to use the application
5. Via Postman, you can access the API on `http://localhost:4000`

## Run Test
1. Use the command: `cd server && yarn test`

