# Prueba de concepto REACT + NODE + MYSQL en DOCKER
### Aplicación de tickets con perfil de usuarios desarrollada en REACT para el FRONT, NODEJS para BACK y MYSQL en la Base de datos. Desplegado completamente en contenedores docker

### Descripción de la aplicación
La aplicación consta de un Login para autenticar los usuarios, luego al ingresar se muestra una tabla dode se administraran todas las funcionalidades de la aplicación. 
- Permite Cear, editar, listar y borrar los usuario de la aplicación 
- Crear, listar, editar y borrar los tickets 
- Crear, listar, editar y borrar los roles del 
- Solo el usuarios con role admin pueden modificar los datos de todos los objetos
- El usuario con role user solo puede modificar el estatus de sus propios tickets

<p align="center">
  <img  src="https://raw.githubusercontent.com/jesuslas/crud-react-laravel/master/client/public/login.PNG">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/jesuslas/crud-react-laravel/master/client/public/dashboard.PNG">
</p>

### Requisitos previos:
- git
- docker 
- docker-compose

## Se clona el repositorio
```bash  
git clone https://github.com/jesuslas/crud-react-nodejs.git
```

## Sen contruye el escenario utilizando docker-compose
### se contruyen los containers del escenario completo
Aqui se construyen las imagenes con los dockerfile para el fron y el back.
```bash  
npm run composer
```
### Se inicializa el Api con la data y las tablas de la db
Aqui se corre el autoload de composer se agregan los migration y se crean los datos de prueba en la bd.

```bash  

```

## los puertos expuestos en el escenario con composer son: 
- Para la DB localhost:3308
- Para el API localhost:8686
- Para el CLIENT localhost:4444


## Sen construyen los contenedores para el escenario manualmente
### Estos conmandos estan construidos para ser ejecutados en windows pront
### crear container para mysql
```bash   
docker run --name mysql-db -p 3307:3306 --memory=512MB --memory-swap=512MB -e MYSQL_ROOT_PASSWORD=manager -e MYSQL_DATABASE=laravel -d mysql --default-authentication-plugin=mysql_native_password
```

### crear container con el laravel api
```bash  

```
### crear container con el laravel client
```bash  

```
## comando utilis

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
docker logs mysql | tail -n 2
mysql -uroot -pmanager -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'"

### arrancar servidor nodejs 
npm start

### crear migration
./node_modules/.bin/sequelize migration:generate --env default --name create-users-table
./node_modules/.bin/sequelize migration:generate --env default --name create-role-table

### ejecutamos la migration
npm run migrate

### se crear los seeders


### se crean los seeders



