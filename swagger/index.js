import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Videogames API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.routes.js', './swagger/components/*.yaml']
}

export const swaggerSpec = swaggerJSDoc(options)
