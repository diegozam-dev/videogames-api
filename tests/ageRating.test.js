import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { connectDB } from '../src/db/connection.js'
import app from '../src/app.js'
import { AgeRatingModel } from '../src/models/index.js'

beforeAll(async () => {
  await connectDB()
})

describe('GET', () => {
  test('Hacer una petición get a "v1/api/age-ratings" debería devolver una colección de age ratings.', async () => {
    const res = await request(app).get('/v1/api/age-ratings')

    const validAgeRating = new AgeRatingModel(res.body.data[0])
    const error = validAgeRating.validateSync()

    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('Ok')
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(error).toBeUndefined()
  })

  test('Hacer una petición get a "v1/api/age-ratings/66d21b1d8f8e38baa6982ee3" debería devolver un age rating.', async () => {
    const res = await request(app).get(
      '/v1/api/age-ratings/66d21b1d8f8e38baa6982ee3'
    )

    const validAgeRating = new AgeRatingModel(res.body.data)
    const error = validAgeRating.validateSync()

    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('Ok')
    expect(error).toBeUndefined()
  })

  test('Hacer una petición get a "v1/api/age-ratings/66d21b1d8f8e28baa6982ee8" debería devolver un error.', async () => {
    const res = await request(app).get(
      '/v1/api/age-ratings/66d21b1d8f8e28baa6982ee8'
    )

    expect(res.status).toEqual(404)
    expect(res.body.messages[0]).toEqual(
      'Entity, with id: 66d21b1d8f8e28baa6982ee8, does not found'
    )
  })
})

describe('POST', () => {
  test('Hacer una petición post a "v1/api/age-ratings" debería devolver el age rating creado.', async () => {
    const res = await request(app)
      .post('/v1/api/age-ratings')
      .send({
        category: 'ESRB',
        rating: 'M',
        contentDescriptions: ['Violence', 'Blood and Gore'],
        coverUrl: 'http://example.com/esrb-m-cover.jpg'
      })
      .set('Accept', 'application/json')

    const createdAgeRating = res.body.data

    expect(res.status).toEqual(201)
    expect(createdAgeRating.category).toEqual('ESRB')
    expect(createdAgeRating.rating).toEqual('M')
    expect(createdAgeRating.contentDescriptions).toEqual([
      'Violence',
      'Blood and Gore'
    ])
    expect(createdAgeRating.coverUrl).toEqual(
      'http://example.com/esrb-m-cover.jpg'
    )
  })

  test('Hacer una petición post a "v1/api/age-ratings" con datos erroneos debería devolver errores de validación.', async () => {
    const res = await request(app)
      .post('/v1/api/age-ratings')
      .send({
        category:
          '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et',
        contentDescriptions: ['Violence', 'Blood and Gore'],
        coverUrl: 'http://example.com/esrb-m-cover.jpg'
      })
      .set('Accept', 'application/json')

    expect(res.status).toEqual(400)
    expect(res.body.messages.length).toBeGreaterThan(0)
  })
})

describe('PUT', () => {
  test('Hacer una petición put a "v1/api/age-ratings/66da0c53e880c15d9c9a39f4" debería devolver el age rating actualizado.', async () => {
    const res = await request(app)
      .put('/v1/api/age-ratings/66da0c53e880c15d9c9a39f4')
      .send({
        category: 'ESRB',
        rating: 'M',
        contentDescriptions: ['Violence', 'Blood and Gore'],
        coverUrl: 'http://example.com/esrb-m-cover.jpg'
      })
      .set('Accept', 'application/json')

    const createdAgeRating = res.body.data

    expect(res.status).toEqual(200)
    expect(createdAgeRating._id).toEqual('66da0c53e880c15d9c9a39f4')
    expect(createdAgeRating.category).toEqual('ESRB')
    expect(createdAgeRating.rating).toEqual('M')
    expect(createdAgeRating.contentDescriptions).toEqual([
      'Violence',
      'Blood and Gore'
    ])
    expect(createdAgeRating.coverUrl).toEqual(
      'http://example.com/esrb-m-cover.jpg'
    )
  })

  describe('DELETE', () => {
    test('Hacer una petición delete a "v1/api/age-ratings/66da0c62630849613db35b37" debería devolver un true indicando que el documento se eliminó correctamente.', async () => {
      const res = await request(app).delete(
        '/v1/api/age-ratings/66da0c62630849613db35b37'
      )

      expect(res.status).toEqual(200)
      expect(res.body.result).toEqual(true)
    })
  })
})
