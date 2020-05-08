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
  <img  src="https://raw.githubusercontent.com/jesuslas/crud-react-nodejs/master/client/public/login.PNG">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/jesuslas/crud-react-nodejs/master/client/public/signup.PNG">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/jesuslas/crud-react-nodejs/master/client/public/dashboard.PNG">
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
Aqui se corre se agregan los migration y se crean los datos de prueba en la bd.

```bash  
npm run db:init
```

## los puertos expuestos en el escenario con composer son: 
- Para la DB localhost:3308
- Para el API localhost:8686
- Para el CLIENT localhost:4444



## comando utilis
```bash
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
docker logs mysql | tail -n 2
mysql -uroot -pmanager -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'"
```
### crear migration. Este comando se corre desde el container del api
```bash 
./node_modules/.bin/sequelize migration:generate --env default --name create-users-table
```
### Ejecutamos la migration. Este comando se debe correr desde la raiz del proyecto
```bash 
npm run migrate
```
### Se crear los seeders. Este comando se corre desde dentro del container del api
```bash 
./node_modules/.bin/sequelize seed:generate --name demo
```
### Se corren los seeders. Este comando se debe correr desde la raiz del proyecto
```bash 
npm run migrate:seed
```
