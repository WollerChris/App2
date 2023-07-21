# App2
App for final Supra Coder Prefix


SETUP
docker was setup using command line
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

after loggin into account i created database called "zwork"

knexfile as shown:

  development: {
    client: 'postgresql',
      connection: {
        host: '127.0.0.1',
        password: 'docker',
        user: 'postgres',
          port: 5432,
          database: 'zwork'
    }
  },

I am also utilizing EXPRESS 

from there a migrated and seeded the falls. 


the frontend needs to be run fron the zfront folder. 



///////
FUNCTION
    Z App will always take you back to main page but just in case i put a button that is easily noticed. 

    App starts at the login page that prompts user to:

            If you are a manager select 
            "manager" role utilizing your account username and password. If you need manager permissions create a manager account. 
    
    Visitors only require to set select to vistor and login to view details
    Managers will require a username and password for authentication:


    When loggin in you are directed straight to the managers page so that you can see 
    all items in inventory. from there you can easily view, update, add and delete all records in the system.  Due to the fact member can delete items created by other users i added an extra step that will turn area red/pink and prompts manager to verify they want item deleted

    From the main managers page user can click yellow personnal inventory button  to view thier inventory. 

    personnel inventory area has same functions but will perform all the add, edit and delete from the single page. 

