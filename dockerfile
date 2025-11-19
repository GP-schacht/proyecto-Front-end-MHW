FROM nginx:alpine
LABEL maintainer="Amirrys <amir.reyesb@gmail.com>"

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy static site files
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
