# SETUP RUNNING THINGSBOARD IN INTELLIJ 

## Prerequisite

### Install necessary tools for CentOS

Before continue to installation execute the following commands in order to install necessary tools:

#### For CentOS 7

```
# Install wget
sudo yum install -y nano wget
# Add latest EPEL release for CentOS 7
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

```

#### For CentOS 8

```
# Install wget
sudo yum install -y nano wget
# Add latest EPEL release for CentOS 7
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm

```


### Install java 11 (OpenJDK)

ThingsBoard service is running on Java 11. Follow this instructions to install OpenJDK 11:

`sudo yum install java-11-openjdk`

Configure your operating system to use OpenJDK 11 by default. You can configure which version is the default using the following command:

`sudo update-alternatives --config java`


### Config firewall to open public ports

Open public port on server to communicate with devices and end users:

`sudo firewall-cmd --zone=public --add-port=5683-5688/udp --permanent`

`sudo firewall-cmd --reload`


Additional cammands: 

- List all firewall rules :

`firewall-cmd --list-all`

- List all currently allowed services:

`bash
firewall-cmd --list-services
`
- List all opened ports:

`bash
firewall-cmd --list-ports
`

### Install Database

By default ThingsBoard uses PostgreSQL database to store entities and timeseries data.

Instructions listed below will help you to install PostgreSQL.

#### For CentOS 7

```
# Install the repository RPM (for CentOS 7):
sudo yum -y install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
# Install packages
sudo yum -y install epel-release yum-utils
sudo yum-config-manager --enable pgdg12
sudo yum install postgresql12-server postgresql12
# Initialize your PostgreSQL DB
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
sudo systemctl start postgresql-12
# Optional: Configure PostgreSQL to start on boot
sudo systemctl enable --now postgresql-12
```

#### For CentOS 8

```
# Install the repository RPM (for CentOS 8):
sudo yum -y install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
# Install packages
sudo dnf -qy module disable postgresql
sudo dnf -y install postgresql12 postgresql12-server
# Initialize your PostgreSQL DB
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
sudo systemctl start postgresql-12
# Optional: Configure PostgreSQL to start on boot
sudo systemctl enable --now postgresql-12
```

Once PostgreSQL is installed you may want to create a new user or set the password for the the main user. The instructions below will help to set the password for main postgresql user

```
sudo su - postgres
psql
\password
\q
```
Then, press “Ctrl+D” to return to main user console.

After configuring the password, edit the pg_hba.conf to use MD5 authentication with the postgres user.

Edit pg_hba.conf file:

`sudo nano /var/lib/pgsql/12/data/pg_hba.conf`

Locate the following lines:

```
# IPv4 local connections:
host    all             all             127.0.0.1/32            ident
```

Replace **ident** with **md5**:

```
host    all             all             127.0.0.1/32            md5
```

Finally, you should restart the PostgreSQL service to initialize the new configuration:

`sudo systemctl restart postgresql-12.service`

Connect to the database to create thingsboard DB:

`psql -U postgres -d postgres -h 127.0.0.1 -W`

Execute create database statement

```
CREATE DATABASE your_thingsboard_database_name;
\q
```
## Install Thingsboard


### Step 1

Clone thingsboard's repository 

`git clone https://github.com/thingsboard/thingsboard.git`

### Step 2

Open Thingsboard in IntelliJ

### Step 3

Build Thingsboard Project

In terminal tab in IntelliJ, run command

`mvn clean install -DskipTest`

### Step 4

#### Create Database schema and populate demo data

In directory **\thingsboard\application\src\java\org\thingsboard\server*

In order to create the database tables, run the following:

Configure Environment varibles in application `ThingsboardInstallApplication` 
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_thingsboard_database_name
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=1
install.load_demo=true
install.data_dir=home/user/thingsboard/application/target/data
```
![image](https://user-images.githubusercontent.com/70082374/193747984-db3a020f-3b10-4e1f-867b-a579082c07e8.png)

Run application `ThingsboardInstallApplication`

#### Running development environment

Configure Environment varibles in application `ThingsboardServerApplication`

```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_thingsboard_database_name
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=1
```
![image](https://user-images.githubusercontent.com/70082374/193748364-6bb8f646-dda7-4c55-a593-f86d765e7f24.png)

Run application `ThingsboardServerApplication`
 
Navigate to http://localhost:4200/ or http://localhost:8080/ and login into ThingsBoard using demo data credentials:

- user: tenant@thingsboard.org
- password: tenant

Any configuration (i.e server port, username/password database) can be change in *thingsboard\application\src\java\org\thingsboard\server\thingsboard.yml*
