# Videogames API :
Esta API permite gestionar información relacionada con videojuegos, incluyendo personajes, compañías y plataformas. Los usuarios pueden consultar y manipular datos sobre videojuegos y las entidades asociadas, siguiendo los permisos correspondientes.

# Índice
* [API Endpoints](#api-endpoints)
* [Stack Tecnológico](#stack-tecnológico)
* [Dependencias](#dependencias)
* [Arquitectura](#arquitectura)
* [Autenticación y Seguridad](#autenticación-y-seguridad)
* [Documentación](#documentación)
* [Instalación y Configuración](#instalación-y-configuración)
* [Errores o Mejoras](#errores-o-mejoras)
* [Licencia](#licencia)

## API Endpoints
Listado de los principales endpoints de la API. Las rutas de creación, actualización y eliminación están protegidas por autenticación, lo que asegura que solo usuarios autorizados puedan realizar modificaciones.

### Character
| Método        | Urls                            | Descripción                         |
|---------------|---------------------------------|-------------------------------------|
| GET           | v1/api/characters               | Obtener todos los personajes.       |
| GET           | v1/api/characters/characterId   | Obtener un personaje.               |
| POST :lock:   | v1/api/characters               | Crear un nuevo personaje.           |
| PUT :lock:    | v1/api/characters/characterId   | Modificar un personaje existente.   |
| DELETE :lock: | v1/api/characters/characterId   | Eliminar un personaje existente.    |

### Company
| Método        | Urls                            | Descripción                         |
|---------------|---------------------------------|-------------------------------------|
| GET           | v1/api/companies                | Obtener todas las compañías.        |
| GET           | v1/api/companies/companyId      | Obtener una compañía.               |
| POST :lock:   | v1/api/companies                | Crear una nueva compañía.           |
| PUT :lock:    | v1/api/companies/companyId      | Modificar una compañía existente.   |
| DELETE :lock: | v1/api/companies/companyId      | Eliminar una compañía existente.    |

### Game
| Método        | Urls                            | Descripción                         |
|---------------|---------------------------------|-------------------------------------|
| GET           | v1/api/games                    | Obtener todos los videojuegos.      |
| GET           | v1/api/games/gameId             | Obtener un videojuego.              |
| POST :lock:   | v1/api/games                    | Crear un nuevo videojuego.          |
| PUT :lock:    | v1/api/games/gameId             | Modificar un videojuego existente.  |
| DELETE :lock: | v1/api/games/gameId             | Eliminar un videojuego existente.   |

### Platform
| Método        | Urls                            | Descripción                         |
|---------------|---------------------------------|-------------------------------------|
| GET           | v1/api/platforms                | Obtener todas las plataformas.      |
| GET           | v1/api/platforms/platformId     | Obtener una plataforma.             |
| POST :lock:   | v1/api/platforms                | Crear una nueva plataforma.         |
| PUT :lock:    | v1/api/platforms/platformId     | Modificar una plataforma existente. |
| DELETE :lock: | v1/api/platforms/platformId     | Eliminar una plataforma existente.  |

## Stack Tecnológico
El proyecto fue desarrollado utilizando las siguientes tecnologías:
* Node.js: Entorno de ejecución para JavaScript en el servidor.
* Express.js: Framework web para Node.js, utilizado para la creación de la API.
* MongoDB Atlas: Base de datos NoSQL en la nube, utilizada para almacenar la información de los videojuegos.
* Git & GitHub: Control de versiones y repositorio para el manejo del código fuente.
* Render: Plataforma de despliegue para la API en producción.
* Visual Studio Code: Editor de código empleado durante el desarrollo.

## Dependencias
El proyecto utiliza las siguientes librerías para su correcto funcionamiento:
| Nombre                              | Versión |
|-------------------------------------|---------|
| apicache                            | 1.6.3   |
| cors                                | 2.8.5   |
| dotenv                              | 16.4.5  |
| express                             | 4.19.2  |
| jsonwebtoken                        | 9.0.2   |
| mongoose                            | 8.5.4   |
| mongoose-autopopulate               | 1.1.0   |
| swagger-jsdoc                       | 6.2.8   |
| swagger-ui-express                  | 5.0.1   |

## Arquitectura
La API sigue una arquitectura en capas para asegurar la separación de responsabilidades y facilitar el mantenimiento:
* Controllers: Gestionan las solicitudes HTTP y llaman a los servicios correspondientes. También manejan posibles errores.
* Services: Validan los datos de las solicitudes y procesan la lógica de negocio. Luego, envían la información a los repositorios.
* Repositories: Interactúan directamente con la base de datos para realizar operaciones CRUD.

## Autenticación y Seguridad
La API protege ciertos endpoints mediante autenticación con JWT (JSON Web Tokens). Solo los usuarios con permisos pueden realizar operaciones de creación, modificación o eliminación de recursos.

## Documentación
La documentación de la API está disponible y se genera automáticamente utilizando Swagger. Para visualizarla, se puede acceder al siguiente endpoint:

/api-docs: Interfaz de usuario de Swagger para explorar y probar los diferentes endpoints de la API.

## Instalación y Configuración
Sigue estos pasos para clonar, configurar e iniciar el proyecto en tu entorno local:
1. Clona el repositorio: Copia el código fuente desde GitHub a tu máquina local utilizando el siguiente comando:
``` Bash
git clone https://github.com/diegozam-dev/videogames-api.git
```

2. Accede al directorio del proyecto: Navega al directorio donde se clonó el proyecto.
``` Bash
cd videogames-api
```

3. Instala las dependencias: Utiliza npm para instalar todas las dependencias necesarias, especificadas en el archivo package.json. Este paso es esencial para que la aplicación funcione correctamente.
``` Bash
npm install
```

4. Configura las variables de entorno: Crea un archivo `.env` en el directorio raíz del proyecto para configurar las variables de entorno. Aquí es donde debes especificar la conexión a tu base de datos MongoDB y la clave secreta para la autenticación JWT.
* MONGODB_URI: URL de conexión a la base de datos MongoDB (puede ser local o en la nube, como MongoDB Atlas).
* DB_NAME: Nombre de la base de datos que utilizará la API.
* USER_NAME y PASSWORD: Credenciales que se utilizarán para generar y verificar tokens JWT. Estos serán necesarios para proteger los endpoints que requieren autenticación.
* SECRET_JWT_KEY: Clave secreta para firmar y verificar los tokens JWT. Asegúrate de que sea una clave segura y difícil de adivinar.

Ejemplo de contenido del archivo `.env`:
``` Bash
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net"
DB_NAME="videogamesDB"
USER_NAME="admin"
PASSWORD="adminpassword"
SECRET_JWT_KEY="supersecretkey"
```

5. Inicia el servidor en modo desarrollo: Corre la aplicación usando el siguiente comando, que levantará el servidor utilizando nodemon para hacer seguimiento de los cambios en tiempo real.
``` Bash
npm run dev
```

Esto pondrá la API en ejecución localmente en http://localhost:3000/ (puedes cambiar el puerto en el archivo de configuración si es necesario).

## Errores o Mejoras
Tu contribución es muy apreciada. Si encuentras errores o crees que hay una mejora por realizar, sigue estos pasos:

1. Reporta un problema: Si encuentras un error, abre un issue en GitHub con una descripción detallada del problema, pasos para reproducirlo, y cualquier detalle técnico relevante.

2. Propon mejoras: Si tienes una idea para mejorar la API, abre un issue o crea un pull request explicando las mejoras que sugieres. Asegúrate de seguir las pautas del proyecto y probar los cambios antes de enviarlos.

3. Pull requests: Si deseas contribuir directamente con código, crea un fork del repositorio, realiza tus cambios, y envía un pull request. Asegúrate de explicar claramente lo que has cambiado y de que tus contribuciones pasen las pruebas existentes.

``` Bash
# Crear una nueva rama para tu contribución
git checkout -b feature/nueva-mejora

# Realizar los cambios y commitearlos
git add .
git commit -m "Descripción clara de la mejora"

# Enviar tu contribución al repositorio original
git push origin feature/nueva-mejora

```

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Esto significa que el software es de código abierto y puede ser utilizado, modificado y distribuido libremente bajo los términos de la licencia, siempre y cuando se mantenga el aviso de copyright.

Puedes consultar el archivo completo de la licencia en el repositorio para más detalles.