# Cross-Platform Authentication Tutorial


## Setup

1. Download and install Virtual Box [5.0.0]: [link](https://www.virtualbox.org/wiki/Downloads)

2. Install Virtual Box Guest Additions : `vagrant plugin install vagrant-vbguest`

3. Download and install Vagrant [1.7.4]: [link](https://www.vagrantup.com/downloads.html)

4. Clone this repository: `git clone https://github.com/ebu/cpa-tutorial.git`

5. Execute: `vagrant up` (take up to ~15min)

6. Log into the virtual machine: `vagrant ssh`

7. Check that host files are correctly shared in `ls /vagrant`


## Development

### Building the base image

The Vagrantfile includes a provisioning script which install the docker environment on a plain Ubuntu box.

1. Start the vm : `vagrant up`
2. Package the image: `vagrant package`


## Contributors

* [Chris Needham](https://github.com/chrisn) (BBC)
* [Michael Barroco](https://github.com/barroco) (EBU)


## Copyright & license

Copyright (c) 2015, EBU-UER Technology & Innovation

The code is under BSD (3-Clause) License. (see LICENSE)
