# website-polymer
IEEE Website 3.0

# Startup Steps
Tested on Ubuntu 20.04 x86
Docker Version: 20.10.9
Node Version: 14.18.1
## Start Docker
```
# clone the repo
git clone git@github.com:ieee-utd/website-polymer.git
cd website-polymer

# run the dependency installer
chmod +x install.sh
./install.sh

# start docker
docker-compose up

```
You should now be able to reach http://dev.ieeeutd.org (SSL not yet enabled for dev)

## Initialize Database 
While docker is running:

```
node api/dist/scripts/initdb.js mongodb://localhost:27000/ieeeutd \
[adminFirstName] [adminLastName] [adminEmail] [adminUserPassword]

```
You should now be able to login to the member portal.
