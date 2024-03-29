# Define node version
FROM node:18.13.0-alpine as build
# Define container directory
WORKDIR /usr/src/app
# Copy package*.json for npm install
COPY package*.json ./
# Upgrade to latest npm version
RUN npm install -g npm@8.19.3
# Run npm clean install, including dev dependencies for @angular-devkit
#RUN npm ci
RUN npm install
# Run npm install @angular/cli
RUN npm install -g @angular/cli
# Copy all files
COPY . .
# Run ng build through npm to create dist folder
RUN npm run build --prod
# Define nginx for front-end server
FROM nginx:1.15.8-alpine
# Copy dist from ng build to nginx html folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
