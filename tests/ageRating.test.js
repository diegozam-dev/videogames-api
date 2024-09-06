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
      expect(res.body.data).toBeInstanceOf(Array)
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/age-ratings/66da1deae9b730782e7dc664” should return an age rating.', async () => {
      const res = await request(app).get(
        '/v1/api/age-ratings/66da1deae9b730782e7dc664'
      )

      const validAgeRating = new AgeRatingModel(res.body.data)
      const error = validAgeRating.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(error).toBeUndefined()
      expect(res.body.data._id).toEqual('66da1deae9b730782e7dc664')
    })

    test('Doing a get request to “v1/api/age-ratings/66d21b1d8f8e28baa6982ee8” should return an error because the entity does not exist.', async () => {
      const res = await request(app).get(
        '/v1/api/age-ratings/66d21b1d8f8e28baa6982ee8'
      )

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages[0]).toEqual(
        'Entity, with id: 66d21b1d8f8e28baa6982ee8, does not found'
      )
    })
  })

  describe('POST', () => {
    test.skip('Making a post request to “v1/api/age-ratings” should return the created age rating.', async () => {
      const res = await request(app)
        .post('/v1/api/age-ratings')
        .send({
          category: 'ESRB',
          rating: 'Mature 17+',
          contentDescriptions: [
            'Intense Violence',
            'Blood and Gore',
            'Strong Language',
            'Suggestive Themes',
            'Use of Drugs'
          ],
          coverUrl: 'https://example.com/cover-image.jpg'
        })
        .set('Accept', 'application/json')

      const createdAgeRating = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Created')
      expect(createdAgeRating.category).toEqual('ESRB')
      expect(createdAgeRating.rating).toEqual('Mature 17+')
      expect(createdAgeRating.contentDescriptions).toEqual([
        'Intense Violence',
        'Blood and Gore',
        'Strong Language',
        'Suggestive Themes',
        'Use of Drugs'
      ])
      expect(createdAgeRating.coverUrl).toEqual(
        'https://example.com/cover-image.jpg'
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
      expect(res.body.status).toEqual('Bad Request')
      expect(res.body.messages.length).toBeGreaterThan(0)
    })
  })

  describe('PUT', () => {
    test.skip('Doing a put request to “v1/api/age-ratings/66da1deae9b730782e7dc668” should return the updated age rating.', async () => {
      const res = await request(app)
        .put('/v1/api/age-ratings/66da1deae9b730782e7dc668')
        .send({
          category: 'Everyone 11+',
          rating: 'E11+',
          contentDescriptions: [
            'Cartoon Violence',
            'Comic Mischief',
            'Language'
          ],
          coverUrl: 'https://example.com/age-rating/e11.png'
        })
        .set('Accept', 'application/json')

      const updatedAgeRating = res.body.data

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Updated')
      expect(res.body.data._id).toEqual('66da1deae9b730782e7dc668')
      expect(updatedAgeRating.category).toEqual('Everyone 11+')
      expect(updatedAgeRating.rating).toEqual('E11+')
      expect(updatedAgeRating.contentDescriptions).toEqual([
        'Cartoon Violence',
        'Comic Mischief',
        'Language'
      ])
      expect(updatedAgeRating.coverUrl).toEqual(
        'https://example.com/age-rating/e11.png'
      )
    })
  })

  describe('DELETE', () => {
    test.skip('Doing a delete request to “v1/api/age-ratings/66da1deae9b730782e7dc666” should return a true indicating that the entity was successfully deleted.', async () => {
      const res = await request(app).delete(
        '/v1/api/age-ratings/66da1deae9b730782e7dc666'
      )

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Deleted')
      expect(res.body.result).toEqual(true)
    })
  })
})
