# Cross-Platform Authentication Tutorial

This repository contains the material for the EBU [DevCon 2015 workshop](https://tech.ebu.ch/devcon15).

It consists of a virtual machine containing reference implementations of the CPA software, including [Authorization Provider](https://github.com/ebu/cpa-auth-provider), [Service Provider](https://github.com/ebu/cpa-service-provider), and [Client](https://github.com/ebu/cpa-client), together with an interactive tutorial using [Jupyter](http://jupyter.org).

Please note that the virtual machine image is about 3GB in size.

## Setup

1. Download and install Virtual Box [5.0.0]: [link](https://www.virtualbox.org/wiki/Downloads)

2. Install Virtual Box Guest Additions: `vagrant plugin install vagrant-vbguest`

3. Download and install Vagrant [1.7.4]: [link](https://www.vagrantup.com/downloads.html)

4. Clone this repository: `git clone https://github.com/ebu/cpa-tutorial.git`

5. Execute: `vagrant up cpa-tutorial`

6. Open a browser and go to : [http://localhost:9000](http://localhost:9000)

## Development

### Building the base image

The Vagrantfile includes a provisioning script which install the docker environment on a plain Ubuntu box.

1. Start the VM: `vagrant up`
2. Package the image: `vagrant package`


## Contributors

* [Chris Needham](https://github.com/chrisn) (BBC)
* [Michael Barroco](https://github.com/barroco) (EBU)


## Copyright & license

Copyright (c) 2015, EBU-UER Technology & Innovation

The code is under BSD (3-Clause) License. (see LICENSE)
