import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { connectDB } from '../src/db/connection.js'
import app from '../src/app.js'
import { CompanyModel } from '../src/models/index.js'

beforeAll(async () => {
  await connectDB()
})

describe('Company Tests', () => {
  describe('GET', () => {
    test('Doing a get request to “v1/api/companies” should return a collection of companies.', async () => {
      const res = await request(app).get('/v1/api/companies')

      const validCompany = new CompanyModel(res.body.data[0])
      const error = validCompany.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(res.body.data).toBeInstanceOf(Array)
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/companies/66da1b3ce9b730782e7dc659” should return an company.', async () => {
      const res = await request(app).get(
        '/v1/api/companies/66da1b3ce9b730782e7dc659'
      )

      const validCompany = new CompanyModel(res.body.data)
      const error = validCompany.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(error).toBeUndefined()
      expect(res.body.data._id).toEqual('66da1b3ce9b730782e7dc659')
    })

    test('Doing a get request to “v1/api/companies/66d21b1d8f8e28baa6982ee8” should return an error because the entity does not exist.', async () => {
      const res = await request(app).get(
        '/v1/api/companies/66d21b1d8f8e28baa6982ee8'
      )

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66d21b1d8f8e28baa6982ee8, does not found'
      )
    })
  })

  describe('POST', () => {
    test.skip('Making a post request to “v1/api/companies” should return the created company.', async () => {
      const res = await request(app)
        .post('/v1/api/companies')
        .send({
          name: 'Ubisoft',
          country: 'France',
          startDate: '1986-03-28T00:00:00.000Z',
          description:
            "Ubisoft is a French video game company known for developing and publishing a wide range of video games across multiple platforms. Notable franchises include Assassin's Creed, Far Cry, and Tom Clancy's series."
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      const createdCompany = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Created')
      expect(createdCompany.name).toEqual('Ubisoft')
      expect(createdCompany.category).toEqual('France')
      expect(createdCompany.startDate).toEqual('1986-03-28T00:00:00.000Z')
      expect(createdCompany.description).toEqual(
        "Ubisoft is a French video game company known for developing and publishing a wide range of video games across multiple platforms. Notable franchises include Assassin's Creed, Far Cry, and Tom Clancy's series."
      )
    })

    test('Making a post request to “v1/api/companies” without a token should return an error.', async () => {
      const res = await request(app)
        .post('/v1/api/companies')
        .send({
          name: 'Ubisoft',
          country: 'France',
          startDate: '1986-03-28T00:00:00.000Z',
          description:
            "Ubisoft is a French video game company known for developing and publishing a wide range of video games across multiple platforms. Notable franchises include Assassin's Creed, Far Cry, and Tom Clancy's series."
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Making a post request to “v1/api/companies” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .post('/v1/api/companies')
        .send({
          name: 'Ubisoft',
          country: 'France',
          startDate: '1986-03-28T00:00:00.000Z',
          description:
            "Ubisoft is a French video game company known for developing and publishing a wide range of video games across multiple platforms. Notable franchises include Assassin's Creed, Far Cry, and Tom Clancy's series."
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

    test.skip('Making a post request to “v1/api/companies” with wrong data should return validation errors.', async () => {
      const res = await request(app)
        .post('/v1/api/companies')
        .send({
          name: 'Ubisoft',
          description:
            "Ubisoft is a French video game company known for developing and publishing a wide range of video games across multiple platforms. Notable franchises include Assassin's Creed, Far Cry, and Tom Clancy's series."
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body.status).toEqual('Bad Request')
      expect(res.body.messages.length).toBeGreaterThan(0)
    })
  })

  describe('PUT', () => {
    test.skip('Doing a put request to “v1/api/companies/66da1b3ce9b730782e7dc65a” should return the updated company.', async () => {
      const res = await request(app)
        .put('/v1/api/companies/66da1b3ce9b730782e7dc65a')
        .send({
          name: 'Electronic Arts',
          country: 'United States of America',
          startDate: '1982-05-27T00:00:00.000Z',
          description:
            'Electronic Arts (EA) is an American video game company that develops and publishes games across various genres, known for franchises like FIFA and Battlefield.'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      const updatedCompany = res.body.data

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Updated')
      expect(updatedCompany.name).toEqual('Electronic Arts')
      expect(updatedCompany.category).toEqual('United States of America')
      expect(updatedCompany.startDate).toEqual('1982-05-27T00:00:00.000Z')
      expect(updatedCompany.description).toEqual(
        'Electronic Arts (EA) is an American video game company that develops and publishes games across various genres, known for franchises like FIFA and Battlefield.'
      )
    })

    test('Doing a put request to “v1/api/companies/66da1b3ce9b730782e7dc65a” without a token should return an error.', async () => {
      const res = await request(app)
        .put('/v1/api/companies/66da1b3ce9b730782e7dc65a')
        .send({
          name: 'Electronic Arts',
          country: 'United States of America',
          startDate: '1982-05-27T00:00:00.000Z',
          description:
            'Electronic Arts (EA) is an American video game company that develops and publishes games across various genres, known for franchises like FIFA and Battlefield.'
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Doing a put request to “v1/api/companies/66da1b3ce9b730782e7dc65a” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .put('/v1/api/companies/66da1b3ce9b730782e7dc65a')
        .send({
          name: 'Electronic Arts',
          country: 'United States of America',
          startDate: '1982-05-27T00:00:00.000Z',
          description:
            'Electronic Arts (EA) is an American video game company that develops and publishes games across various genres, known for franchises like FIFA and Battlefield.'
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

    test.skip('Doing a put request to “v1/api/companies/66d21b1d8f8e28baa6982ee8” should return an error because the entity does not exist.', async () => {
      const res = await request(app)
        .put('/v1/api/companies/66d21b1d8f8e28baa6982ee8')
        .send({
          name: 'Electronic Arts',
          country: 'United States of America',
          startDate: '1982-05-27T00:00:00.000Z',
          description:
            'Electronic Arts (EA) is an American video game company that develops and publishes games across various genres, known for franchises like FIFA and Battlefield.'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66d21b1d8f8e28baa6982ee8, does not found'
      )
    })
  })

  describe('DELETE', () => {
    test.skip('Doing a delete request to “v1/api/companies/66da1b3ce9b730782e7dc65d” should return a true indicating that the entity was successfully deleted.', async () => {
      const res = await request(app)
        .delete('/v1/api/companies/66da1b3ce9b730782e7dc65d')
        .set('Authorization', 'Bearer <<TOKEN>>')

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Deleted')
      expect(res.body.result).toEqual(true)
    })

    test('Doing a delete request to “v1/api/companies/66da1b3ce9b730782e7dc65d” without a token should return an error.', async () => {
      const res = await request(app).delete(
        '/v1/api/companies/66da1b3ce9b730782e7dc65d'
      )

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Doing a delete request to “v1/api/companies/66da1b3ce9b730782e7dc65d” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .delete('/v1/api/companies/66da1b3ce9b730782e7dc65d')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        )

      expect(res.status).toEqual(403)
      expect(res.body.status).toEqual('Forbidden')
      expect(res.body.messages).toEqual('Token not valid')
    })

    test.skip('Doing a delete request to “v1/api/companies/66d21b1d8f8e28baa6982ee8” should return an error because the entity does not exist.', async () => {
      const res = await request(app)
        .delete('/v1/api/companies/66d21b1d8f8e28baa6982ee8')
        .set('Authorization', 'Bearer <<TOKEN>>')

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66d21b1d8f8e28baa6982ee8, does not found'
      )
    })
  })
})
