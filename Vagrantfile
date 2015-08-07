# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define "cpa-tutorial", primary: true do |tutorial|
    tutorial.vm.box = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
    tutorial.vm.provision "shell", path: "base/vagrant_provision.sh"
    tutorial.vm.provision "shell", path: "base/vagrant_development_provision.sh"
    tutorial.ssh.insert_key = false
    config.vm.network "forwarded_port", guest: 8000, host: 8000
  end
end
