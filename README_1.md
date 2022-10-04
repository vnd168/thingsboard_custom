# BUILD THINGSBOARD IN INTELLIJ



## Prerequisite

### Update library 
a. For CentOS 7

Install `wget` with command:

`sudo yum install -y nano wget`

Add latest EPEL release for CentOS 7:

`sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest--7.noarch.rpm`

b. For CentOS 8

Install `wget` with command:

`sudo yum install -y nano wget`

Add latest EPEL release for CentOS 8:

`sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm`

### Intstall Java

Install java package with command:

`sudo yum install java-11-openjdk`

or

`sudo yum install java-11-openjdk-devel`

### Firewall

`sudo firewall-cmd --zone=public --add-port=5683-5688/udp --permanent`

`sudo firewall-cmd --reload`

`firewall-cmd --list-all`



### Database

By default ThingsBoard uses PostgreSQL database to store entities and timeseries data. 

Please use [this link](https://wiki.postgresql.org/wiki/Detailed_installation_guides) for the PostgreSQL installation instructions.

Once PostgreSQL is installed you may want to create a new user or set the password for the main user.

Then, press “Ctrl+D” to return to main user console and connect to the database to create thingsboard DB:

`psql -U postgres -d postgres -h 127.0.0.1 -W`

`CREATE DATABASE your_thingsboard_database_name;`

`\q`

## Step 1

Clone thingsboard's repository 

`git clone https://github.com/thingsboard/thingsboard.git`

## Step 2

Open Thingsboard in IntelliJ

## Step 3

Build Thingsboard Project

In terminal tab in IntelliJ, run command

`mvn clean install -DskipTest`

## Step 4

Running development environment

<img src="link_anh_cua_ban">

In directory *\thingsboard\application\src\java\org\thingsboard\server*

Run `ThingsboardInstallApplication`

Run `ThingsboardServerApplication`

Server Thingsboard is in `http://localhost:8080`

Any configuration (i.e server port, username/password database) can be change in *thingsboard\application\src\java\org\thingsboard\server\thingsboard.yml*
