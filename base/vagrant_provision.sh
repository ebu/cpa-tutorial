#!/bin/sh

# This script installs the docker environment including docker-compose.

# Install docker
wget -qO- https://get.docker.com/ | sh
sudo usermod -aG docker vagrant

# Install docker compose
curl -L https://github.com/docker/compose/releases/download/1.3.3/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
