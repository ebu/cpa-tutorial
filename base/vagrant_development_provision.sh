#!/bin/sh

# This script installs the correct dependencies required by virtual box to enable shared folder on Ubuntu OS.

export VBOX_VERSION="5.0.0"
sudo apt-get install -y linux-headers-generic build-essential dkms
wget http://download.virtualbox.org/virtualbox/$VBOX_VERSION/VBoxGuestAdditions_$VBOX_VERSION.iso
sudo mount -o loop,ro VBoxGuestAdditions_$VBOX_VERSION.iso /mnt
cd /mnt
sudo apt-get remove -y --purge virtualbox-*
sudo sh ./VBoxLinuxAdditions.run uninstall
yes "yes" | sudo sh ./VBoxLinuxAdditions.run install
sudo /etc/init.d/vboxadd setup

echo "Cleaning up"
sudo apt-get clean
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

echo "Provisioning done. Please do a 'vagrant reload' on the host."
