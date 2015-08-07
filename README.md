# Cross-Platform Authentication Tutorial


## Setup

1. Download and install Virtual Box: [link](https://www.virtualbox.org/wiki/Downloads)

2. Download and install Vagrant: [link](https://www.vagrantup.com/downloads.html)


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
