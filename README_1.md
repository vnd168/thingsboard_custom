# BUILD THINGSBOARD IN INTELLIJ

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

Run Thingsboard Server

In directory *\thingsboard\application\src\java\org\thingsboard\server*

Run `ThingsboardInstallApplication`

Run `ThingsboardServerApplication`

Server Thingsboard is in `http://localhost:8080`

Any configuration (i.e server port, username/password database) can be change in *thingsboard\application\src\java\org\thingsboard\server\thingsboard.yml*
