# Cross-Platform Authentication Tutorial

This repository contains the material for the EBU [DevCon 2015 workshop](https://tech.ebu.ch/devcon15) on [Cross Platform Authentication](https://tech.ebu.ch/docs/tech/tech3366.pdf).

It provides the means to set up a fully self-contained virtual machine image containing the reference implementation of CPA, (the [Authorization Provider](https://github.com/ebu/cpa-auth-provider), [Service Provider](https://github.com/ebu/cpa-service-provider), and [Client](https://github.com/ebu/cpa-client)) together with an interactive tutorial using [Jupyter](http://jupyter.org).

Please note that the virtual machine image is about 3GB in size. Completing the setup steps below will take about 30-40 minutes.


## <a name="setup"></a>Setup

1. Download and install Virtual Box [version 5.0.0+]: [link](https://www.virtualbox.org/wiki/Downloads)

2. Download and install Vagrant [version 1.7.4+]: [link](https://www.vagrantup.com/downloads.html)

3. Install Virtual Box Guest Additions: `vagrant plugin install vagrant-vbguest`

4. Clone this repository: `git clone https://github.com/ebu/cpa-tutorial.git`

5. <a name="setup-5">Change into the cpa-tutorial directory: `cd cpa-tutorial`

6. Install the cpa-tutorial virtual machine image: `vagrant up cpa-tutorial`

7. Open a browser and go to : [http://localhost:9000](http://localhost:9000)

8. When you have finished with the tutorial, shut down the virtual machine: `vagrant halt cpa-tutorial`

## Normal usage

1. Change into the cpa-tutorial directory: `cd cpa-tutorial`

2. Start the virtual machine: `vagrant up cpa-tutorial`

2. Open a browser and go to : [http://localhost:9000](http://localhost:9000)

3. Shut down the virtual machine: `vagrant halt cpa-tutorial`

## Uninstall

If you wish to completely remove the cpa-tutorial virtual machine image from your system:

1. Change into the cpa-tutorial directory: `cd cpa-tutorial`

2. Remove the vagrant image: `vagrant destroy`

To re-install the tutorial, start at [step 5](#setup-5) of [Setup](#setup) above.


## Development

### Building the base image

The Vagrantfile includes a provisioning script which installs the docker environment on a plain Ubuntu box.

1. Start the VM: `vagrant up`
2. Package the image: `vagrant package`


## Contributors

* [Chris Needham](https://github.com/chrisn) (BBC)
* [Michael Barroco](https://github.com/barroco) (EBU)


## Copyright & license

Copyright (c) 2015, EBU-UER Technology & Innovation

The code is under BSD (3-Clause) License. (see LICENSE)
