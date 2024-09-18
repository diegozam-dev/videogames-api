import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Videogames API',
      description:
        'Esta API proporciona información y gestión de videojuegos, incluidos personajes, empresas y plataformas. Los usuarios pueden recuperar datos sobre videojuegos y entidades relacionadas.',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.routes.js', './swagger/components/*.yaml']
}

export const swaggerSpec = swaggerJSDoc(options)
