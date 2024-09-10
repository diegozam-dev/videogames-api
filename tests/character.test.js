import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { connectDB } from '../src/db/connection.js'
import app from '../src/app.js'
import { CharacterModel } from '../src/models/index.js'

beforeAll(async () => {
  await connectDB()
})

describe('Character Tests', () => {
  describe('GET', () => {
    test('Doing a get request to “v1/api/characters” should return a collection of characters.', async () => {
      const res = await request(app).get('/v1/api/characters')

      const validCharacter = new CharacterModel(res.body.data[0])
      const error = validCharacter.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(res.body.data).toBeInstanceOf(Array)
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/characters/66db4a4e523626bb53b88a32” should return one character.', async () => {
      const res = await request(app).get(
        '/v1/api/characters/66db4a4e523626bb53b88a32'
      )

      const validCharacter = new CharacterModel(res.body.data)
      const error = validCharacter.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(error).toBeUndefined()
      expect(res.body.data._id).toEqual('66db4a4e523626bb53b88a32')
    })

    test('Doing a get request to “v1/api/characters/66db4a4e523226bb53b88a34” should return an error because the entity does not exist.', async () => {
      const res = await request(app).get(
        '/v1/api/characters/66db4a4e523226bb53b88a34'
      )

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages).toEqual(
        'Entity, with id: 66db4a4e523226bb53b88a34, does not found'
      )
    })
  })

  describe('POST', () => {
    test.skip('Making a post request to “v1/api/characters” should return the created character.', async () => {
      const res = await request(app)
        .post('/v1/api/characters')
        .send({
          name: 'Ellie',
          gender: 'Female',
          species: 'Human',
          games: ['66da1ea1e9b730782e7dc669'],
          description:
            'Ellie is one of the main characters of The Last of Us Part I. She is a strong-willed survivor seeking revenge for the death of her loved one.'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      const createdCharacter = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Created')
      expect(createdCharacter.name).toEqual('Ellie')
      expect(createdCharacter.gender).toEqual('Female')
      expect(createdCharacter.species).toEqual('Human')
      expect(createdCharacter.games).toEqual(['66da1ea1e9b730782e7dc669'])
      expect(createdCharacter.description).toEqual(
        'Ellie is one of the main characters of The Last of Us Part I. She is a strong-willed survivor seeking revenge for the death of her loved one.'
      )
    })

    test('Making a post request to “v1/api/characters” without a token should return an error.', async () => {
      const res = await request(app)
        .post('/v1/api/characters')
        .send({
          name: 'Ellie',
          gender: 'Female',
          species: 'Human',
          games: ['66da1ea1e9b730782e7dc669'],
          description:
            'Ellie is one of the main characters of The Last of Us Part I. She is a strong-willed survivor seeking revenge for the death of her loved one.'
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Making a post request to “v1/api/characters” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .post('/v1/api/characters')
        .send({
          name: 'Ellie',
          gender: 'Female',
          species: 'Human',
          games: ['66da1ea1e9b730782e7dc669'],
          description:
            'Ellie is one of the main characters of The Last of Us Part I. She is a strong-willed survivor seeking revenge for the death of her loved one.'
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

    test.skip('Making a post request to “v1/api/characters” with wrong data should return validation errors.', async () => {
      const res = await request(app)
        .post('/v1/api/characters')
        .send({
          name: 'Abby Anderson',
          gender:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et',
          games: ['66d7621aa1ce7534fabafd63'],
          description:
            'Abby is a skilled soldier and one of the central characters in The Last of Us Part II. Her journey is marked by a quest for vengeance and redemption.'
        })
        .set('Authorization', 'Bearer <<TOKEN>>')
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body.status).toEqual('Bad Request')
      expect(res.body.messages.length).toBeGreaterThan(0)
    })
  })

  describe('PUT', () => {
    test.skip('Doing a put request to “v1/api/characters/66db4a4e523626bb53b88a34” should return the updated character.', async () => {
      const res = await request(app)
        .put('/v1/api/characters/66db4a4e523626bb53b88a34')
        .send({
          name: 'Master C.',
          gender: 'Male',
          species: 'Human',
          games: ['66da1ea1e9b730782e7dc66b'],
          description:
            'Master Chief is a super-soldier known as a Spartan-II, and the protagonist of the Halo series.'
        })
        .set('Accept', 'application/json')

      const updatedCharacter = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Updated')
      expect(res.body.data._id).toEqual('66db4a4e523626bb53b88a34')
      expect(updatedCharacter.name).toEqual('Master C.')
      expect(updatedCharacter.gender).toEqual('Male')
      expect(updatedCharacter.species).toEqual('Human')
      expect(updatedCharacter.games).toEqual(['66da1ea1e9b730782e7dc66b'])
      expect(updatedCharacter.description).toEqual(
        'Master Chief is a super-soldier known as a Spartan-II, and the protagonist of the Halo series.'
      )
    })

    test('Doing a put request to “v1/api/characters/66db4a4e523626bb53b88a34” without a token should return an error.', async () => {
      const res = await request(app)
        .put('/v1/api/characters/66db4a4e523626bb53b88a34')
        .send({
          name: 'Master C.',
          gender: 'Male',
          species: 'Human',
          games: ['66da1ea1e9b730782e7dc66b'],
          description:
            'Master Chief is a super-soldier known as a Spartan-II, and the protagonist of the Halo series.'
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Doing a put request to “v1/api/characters/66db4a4e523626bb53b88a34” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .put('/v1/api/characters/66db4a4e523626bb53b88a34')
        .send({
          name: 'Master C.',
          gender: 'Male',
          species: 'Human',
          games: ['66da1ea1e9b730782e7dc66b'],
          description:
            'Master Chief is a super-soldier known as a Spartan-II, and the protagonist of the Halo series.'
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
  })

  describe('DELETE', () => {
    test.skip('Doing a delete request to “v1/api/characters/66db4a4e523626bb53b88a35” should return a true indicating that the entity was successfully deleted.', async () => {
      const res = await request(app).delete(
        '/v1/api/characters/66db4a4e523626bb53b88a35'
      )

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Deleted')
      expect(res.body.result).toEqual(true)
    })

    test('Doing a delete request to “v1/api/characters/66db4a4e523626bb53b88a35” without a token should return an error.', async () => {
      const res = await request(app).delete(
        '/v1/api/characters/66db4a4e523626bb53b88a35'
      )

      expect(res.status).toEqual(401)
      expect(res.body.status).toEqual('Unauthorized')
      expect(res.body.messages).toEqual('Token not provied')
    })

    test('Doing a delete request to “v1/api/characters/66db4a4e523626bb53b88a35” with an incorrect token should return an error.', async () => {
      const res = await request(app)
        .delete('/v1/api/characters/66db4a4e523626bb53b88a35')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        )

      expect(res.status).toEqual(403)
      expect(res.body.status).toEqual('Forbidden')
      expect(res.body.messages).toEqual('Token not valid')
    })
  })
})
