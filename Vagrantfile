# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.insert_key = false
  config.ssh.username = 'vagrant'
  config.ssh.password = 'vagrant'


  # Box provisioned INCLUDING CPA docker images
  # (simple download of the image INCLUDING CPA docker images and restart of services)
  config.vm.define "cpa-tutorial", primary: true do |tutorial|
    tutorial.vm.box = "http://output.ebu.io/vm/cpa-tutorial.box"
    # fix 'stdin is not a tty' error
    config.vm.provision "fix-no-tty", type: "shell" do |s|
      s.privileged = false
      s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
    end
    tutorial.vm.provision "shell", path: "docker/init/docker_restart.sh", run: "always", privileged: true
    tutorial.ssh.insert_key = false
    tutorial.vm.network "forwarded_port", guest: 9000, host: 9000
    tutorial.vm.network "forwarded_port", guest: 8000, host: 8000
    tutorial.vm.network "forwarded_port", guest: 8001, host: 8001
    tutorial.vm.network "forwarded_port", guest: 8002, host: 8002

    tutorial.vm.provider "virtualbox" do |v|
      v.name = "cpa-tutorial"
      v.memory = 1024
      v.cpus = 2
    end
  end

  # Box WITHOUT CPA docker images
  # (simple download of a plain docker installation WITHOUT CPA docker images and restart of services)
  config.vm.define "cpa-tutorial-dev" do |tutorial|
    tutorial.vm.box = "http://output.ebu.io/vm/docker-base.box"
    # fix 'stdin is not a tty' error
    config.vm.provision "fix-no-tty", type: "shell" do |s|
      s.privileged = false
      s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
    end
    tutorial.vm.provision "shell", path: "docker/init/docker_restart.sh", run: "always", privileged: true
    tutorial.ssh.insert_key = false
    tutorial.vm.network "forwarded_port", guest: 9000, host: 9000
    tutorial.vm.network "forwarded_port", guest: 8000, host: 8000
    tutorial.vm.network "forwarded_port", guest: 8001, host: 8001
    tutorial.vm.network "forwarded_port", guest: 8002, host: 8002

    tutorial.vm.provider "virtualbox" do |v|
      v.name = "cpa-tutorial-dev"
      v.memory = 1024
      v.cpus = 2
    end
  end

  # Simple Ubuntu image and provision docker installation
  config.vm.define "docker-base", autostart: false do |base|
    base.vm.box = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
    base.vm.provision "shell", path: "base/vagrant_provision.sh"
    base.vm.provision "shell", path: "base/vagrant_development_provision.sh"
    base.vm.provider "virtualbox" do |v|
      v.name = "docker-base"
      v.memory = 1024
      v.cpus = 2
    end
  end
end
