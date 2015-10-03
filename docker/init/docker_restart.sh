#!/bin/sh

cp /vagrant/docker/init/cpa-tutorial.conf /etc/init/cpa-tutorial.conf

initctl reload-configuration
start cpa-tutorial
