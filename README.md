# Personal Trainer application for Frontend Development courses final project

## Running project on Debian 12

### Installing needed software

Install git, curl and npm

    $ sudo apt-get update
    $ sudo apt-get -y install git curl npm

Install nodejs

    $ curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
    $ sudo apt-get install -y nodejs

Confirm you have proper npm and nodejs versions

    $ node -v
    v22.15.0
    $ npm -v
    10.9.2

### Building project

Clone project repository from GitHub

    $ git clone https://github.com/aavetatu/personalTrainer

Install project dependencies and build project

    $ cd /path/to/your/project
    $ npm install
    $ npm run build

Install serve as a simple static server and run project locally in [localhost:3000](localhost:3000)

    $ npm install -g serve
    $ serve -s dist
