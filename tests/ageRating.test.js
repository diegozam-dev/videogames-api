import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { connectDB } from '../src/db/connection.js'
import app from '../src/app.js'
import { AgeRatingModel } from '../src/models/index.js'

beforeAll(async () => {
  await connectDB()
})

describe('Age Rating Tests', () => {
  describe('GET', () => {
    test('Doing a get request to “v1/api/age-ratings” should return a collection of age ratings.', async () => {
      const res = await request(app).get('/v1/api/age-ratings')

      const validAgeRating = new AgeRatingModel(res.body.data[0])
      const error = validAgeRating.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(Array.isArray(res.body.data)).toBe(true)
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/age-ratings/66d21b1d8f8e38baa6982ee3” should return an age rating.', async () => {
      const res = await request(app).get(
        '/v1/api/age-ratings/66d21b1d8f8e38baa6982ee3'
      )

      const validAgeRating = new AgeRatingModel(res.body.data)
      const error = validAgeRating.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/age-ratings/66d21b1d8f8e28baa6982ee8” should return an error because the entity does not exist.', async () => {
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
    test('Making a post request to “v1/api/age-ratings” should return the created age rating.', async () => {
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

    test('Making a post request to “v1/api/age-ratings” with wrong data should return validation errors.', async () => {
      const res = await request(app)
        .post('/v1/api/age-ratings')
        .send({
          category:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et',
          contentDescriptions: ['Violence', 'Blood and Gore'],
          coverUrl: 'http://example.com/esrb-m-cover.jpg'
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body.messages.length).toBeGreaterThan(0)
    })
  })

  describe('PUT', () => {
    test('Doing a put request to “v1/api/age-ratings/66da0c53e880c15d9c9a39f4” should return the updated age rating.', async () => {
      const res = await request(app)
        .put('/v1/api/age-ratings/66da0c53e880c15d9c9a39f4')
        .send({
          category: 'ESRB',
          rating: 'M',
          contentDescriptions: ['Violence', 'Blood and Gore'],
          coverUrl: 'http://example.com/esrb-m-cover.jpg'
        })
        .set('Accept', 'application/json')

      const updatedAgeRating = res.body.data

      expect(res.status).toEqual(200)
      expect(updatedAgeRating._id).toEqual('66da0c53e880c15d9c9a39f4')
      expect(updatedAgeRating.category).toEqual('ESRB')
      expect(updatedAgeRating.rating).toEqual('M')
      expect(updatedAgeRating.contentDescriptions).toEqual([
        'Violence',
        'Blood and Gore'
      ])
      expect(updatedAgeRating.coverUrl).toEqual(
        'http://example.com/esrb-m-cover.jpg'
      )
    })

    describe('DELETE', () => {
      test('Doing a delete request to “v1/api/age-ratings/66da0c62630849613db35b37” should return a true indicating that the entity was successfully deleted.', async () => {
        const res = await request(app).delete(
          '/v1/api/age-ratings/66da0c62630849613db35b37'
        )

        expect(res.status).toEqual(200)
        expect(res.body.result).toEqual(true)
      })
    })
  })
})
