import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { connectDB } from '../src/db/connection.js'
import app from '../src/app.js'
import { PlatformModel } from '../src/models/index.js'

beforeAll(async () => {
  await connectDB()
})

describe('Platform Tests', () => {
  describe('GET', () => {
    test('Doing a get request to “v1/api/platforms” should return a collection of platforms.', async () => {
      const res = await request(app).get('/v1/api/platforms')

      const validPlatform = new PlatformModel(res.body.data[0])
      const error = validPlatform.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(res.body.data).toBeInstanceOf(Array)
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/platforms/66da1ceee9b730782e7dc660” should return an platform.', async () => {
      const res = await request(app).get(
        '/v1/api/platforms/66da1ceee9b730782e7dc660'
      )

      const validPlatform = new PlatformModel(res.body.data)
      const error = validPlatform.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(error).toBeUndefined()
      expect(res.body.data._id).toEqual('66da1ceee9b730782e7dc660')
    })

    test('Doing a get request to “v1/api/platforms/66db4a4e523226bb53b88a34” should return an error because the entity does not exist.', async () => {
      const res = await request(app).get(
        '/v1/api/platforms/66db4a4e523226bb53b88a34'
      )

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66db4a4e523226bb53b88a34, does not found'
      )
    })
  })

  describe('POST', () => {
    test.skip('Making a post request to “v1/api/platforms” should return the created character.', async () => {
      const res = await request(app)
        .post('/v1/api/platforms')
        .send({
          name: 'PlayStation 4',
          abbreviation: 'PS4',
          launchDate: '2013-11-15T00:00:00.000+00:00',
          company: '66da1b3ce9b730782e7dc65b'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      const createdPlatform = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Created')
      expect(createdPlatform.name).toEqual('PlayStation 4')
      expect(createdPlatform.abbreviation).toEqual('PS4')
      expect(createdPlatform.launchDate).toEqual(
        '2013-11-15T00:00:00.000+00:00'
      )
      expect(createdPlatform.company).toEqual('66da1b3ce9b730782e7dc65b')
    })

    test('Making a post request to “v1/api/platforms” without a token should return an error.', async () => {
      const res = await request(app)
        .post('/v1/api/platforms')
        .send({
          name: 'PlayStation 4',
          abbreviation: 'PS4',
          launchDate: '2013-11-15T00:00:00.000+00:00',
          company: '66da1b3ce9b730782e7dc65b'
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Making a post request to “v1/api/platforms” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .post('/v1/api/platforms')
        .send({
          name: 'PlayStation 4',
          abbreviation: 'PS4',
          launchDate: '2013-11-15T00:00:00.000+00:00',
          company: '66da1b3ce9b730782e7dc65b'
        })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        )
        .set('Accept', 'application/json')

      expect(res.status).toEqual(403)
      expect(res.body.status).toEqual('Forbidden')
      expect(res.body.messages).toEqual('Token not valid')
    })

    test.skip('Making a post request to “v1/api/platforms” with wrong data should return validation errors.', async () => {
      const res = await request(app)
        .post('/v1/api/platforms')
        .send({
          name: 'PlayStation 4',
          abbreviation: 'PS4',
          company: '66da1b3ce9b230782e7dc35b'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body.status).toEqual('Bad Request')
      expect(res.body.messages.length).toBeGreaterThan(0)
    })
  })

  describe('PUT', () => {
    test.skip('Doing a put request to “v1/api/platforms/66da1ceee9b730782e7dc661” should return the updated character.', async () => {
      const res = await request(app)
        .put('/v1/api/platforms/66da1ceee9b730782e7dc661')
        .send({
          name: 'Nintendo Switch Oled',
          abbreviation: 'Switch Oled',
          launchDate: '2017-03-03T00:00:00.000Z',
          company: '66da1b3ce9b730782e7dc659'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      const updatedPlatform = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Updated')
      expect(res.body.data._id).toEqual('66da1ceee9b730782e7dc661')
      expect(updatedPlatform.name).toEqual('Nintendo Switch Oled')
      expect(updatedPlatform.abbreviation).toEqual('Switch Oled')
      expect(updatedPlatform.launchDate).toEqual('2017-03-03T00:00:00.000Z')
      expect(updatedPlatform.company).toEqual('66da1b3ce9b730782e7dc659')
    })

    test('Doing a put request to “v1/api/platforms/66da1ceee9b730782e7dc661” without a token should return an error.', async () => {
      const res = await request(app)
        .put('/v1/api/platforms/66da1ceee9b730782e7dc661')
        .send({
          name: 'Nintendo Switch Oled',
          abbreviation: 'Switch Oled',
          launchDate: '2017-03-03T00:00:00.000Z',
          company: '66da1b3ce9b730782e7dc659'
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Doing a put request to “v1/api/platforms/66da1ceee9b730782e7dc661” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .put('/v1/api/platforms/66da1ceee9b730782e7dc661')
        .send({
          name: 'Nintendo Switch Oled',
          abbreviation: 'Switch Oled',
          launchDate: '2017-03-03T00:00:00.000Z',
          company: '66da1b3ce9b730782e7dc659'
        })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        )
        .set('Accept', 'application/json')

      expect(res.status).toEqual(403)
      expect(res.body.status).toEqual('Forbidden')
      expect(res.body.messages).toEqual('Token not valid')
    })

    test.skip('Doing a put request to “v1/api/platforms/66db4a4e523226bb53b88a34” should return an error because the entity does not exist.', async () => {
      const res = await request(app)
        .put('/v1/api/platforms/66db4a4e523226bb53b88a34')
        .set('Authorization', 'Bearer <<TOKEN>>')

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66db4a4e523226bb53b88a34, does not found'
      )
    })
  })

  describe('DELETE', () => {
    test.skip('Doing a delete request to “v1/api/platforms/66da1ceee9b730782e7dc662” should return a true indicating that the entity was successfully deleted.', async () => {
      const res = await request(app)
        .delete('/v1/api/platforms/66da1ceee9b730782e7dc662')
        .set('Authorization', 'Bearer <<TOKEN>>')

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Deleted')
      expect(res.body.result).toEqual(true)
    })

    test('Doing a delete request to “v1/api/platforms/66da1ceee9b730782e7dc662” without a token should return an error.', async () => {
      const res = await request(app).delete(
        '/v1/api/platforms/66da1ceee9b730782e7dc662'
      )

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Doing a delete request to “v1/api/platforms/66da1ceee9b730782e7dc662” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .delete('/v1/api/platforms/66da1ceee9b730782e7dc662')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        )

      expect(res.status).toEqual(403)
      expect(res.body.status).toEqual('Forbidden')
      expect(res.body.messages).toEqual('Token not valid')
    })

    test.skip('Doing a delete request to “v1/api/platforms/66db4a4e523226bb53b88a34” should return an error because the entity does not exist.', async () => {
      const res = await request(app)
        .delete('/v1/api/platforms/66db4a4e523226bb53b88a34')
        .set('Authorization', 'Bearer <<TOKEN>>')

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66db4a4e523226bb53b88a34, does not found'
      )
    })
  })
})
