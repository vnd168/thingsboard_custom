# BUILD THINGSBOARD IN INTELLIJ



## Prerequisite

Before continue to installation execute the following commands in order to install necessary tools:

### For CentOS 7

```
# Install wget
sudo yum install -y nano wget
# Add latest EPEL release for CentOS 7
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

```

### For CentOS 8

```
# Install wget
sudo yum install -y nano wget
# Add latest EPEL release for CentOS 7
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm

```


### Intstall Java

ThingsBoard service is running on Java 11. Follow this instructions to install OpenJDK 11:

`sudo yum install java-11-openjdk`

Configure your operating system to use OpenJDK 11 by default. You can configure which version is the default using the following command:

`sudo update-alternatives --config java`


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

<img src="![image]([https://user-images.githubusercontent.com/70082374/193747694-907131c0-943c-4d7b-adcf-bb412357e989.png](https://upload-images.jianshu.io/upload_images/8210963-fe411e08c4fb2c26.png?imageMogr2/auto-orient/strip|imageView2/2/w/1148/format/webp))">

In directory *\thingsboard\application\src\java\org\thingsboard\server*

Configure Environment varibles in application `ThingsboardInstallApplication` 

```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_thingsboard_database_name
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=1
install.load_demo=true
install.data_dir=thingsboard\application\target\data
```

Configure Environment varibles in application `ThingsboardServerApplication`

```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_thingsboard_database_name
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=1
```
Run application `ThingsboardServerApplication`
 
Navigate to http://localhost:4200/ or http://localhost:8080/ and login into ThingsBoard using demo data credentials:

- user: tenant@thingsboard.org
- password: tenant

Any configuration (i.e server port, username/password database) can be change in *thingsboard\application\src\java\org\thingsboard\server\thingsboard.yml*
