import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { connectDB } from '../src/db/connection.js'
import app from '../src/app.js'
import { GameModel } from '../src/models/index.js'

beforeAll(async () => {
  await connectDB()
})

describe('Game Tests', () => {
  describe('GET', () => {
    test('Doing a get request to “v1/api/games” should return a collection of games.', async () => {
      const res = await request(app).get('/v1/api/games')

      const validGame = new GameModel(res.body.data[0])
      const error = validGame.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(res.body.data).toBeInstanceOf(Array)
      expect(error).toBeUndefined()
    })

    test('Doing a get request to “v1/api/games/66da1ea1e9b730782e7dc669” should return an game.', async () => {
      const res = await request(app).get(
        '/v1/api/games/66da1ea1e9b730782e7dc669'
      )

      const validGame = new GameModel(res.body.data)
      const error = validGame.validateSync()

      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('Ok')
      expect(error).toBeUndefined()
      expect(res.body.data._id).toEqual('66da1ea1e9b730782e7dc669')
    })

    test('Doing a get request to “v1/api/games/66d21b1d8f8e28baa6982ee8” should return an error because the entity does not exist.', async () => {
      const res = await request(app).get(
        '/v1/api/games/66d21b1d8f8e28baa6982ee8'
      )

      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('Not Found')
      expect(res.body.messages[0]).toEqual(
        'Entity, with id: 66d21b1d8f8e28baa6982ee8, does not found'
      )
    })
  })

  describe('POST', () => {
    test.skip('Making a post request to “v1/api/games” should return the created company.', async () => {
      const res = await request(app)
        .post('/v1/api/games')
        .send({
          name: 'Gears 5',
          genres: ['Third-person shooter'],
          category: 'AAA',
          gameModes: ['Single-player', 'Multiplayer'],
          audioLanguages: ['English', 'Spanish'],
          textLanguages: ['English', 'Spanish'],
          releaseDate: '2019-09-10T00:00:00.000Z',
          publishers: ['66da1c63e9b730782e7dc65e'],
          developers: ['66da1c63e9b730782e7dc65e'],
          ageRating: '66da1deae9b730782e7dc667',
          coverUrl: 'https://example.com/gears-5-cover.png',
          platforms: ['66da1ceee9b730782e7dc662']
        })
        .set('Accept', 'application/json')

      const createdGame = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Created')
      expect(createdGame.name).toEqual('Gears 5')
      expect(createdGame.genres).toEqual(['Third-person shooter'])
      expect(createdGame.category).toEqual('AAA')
      expect(createdGame.gameModes).toEqual(['Single-player', 'Multiplayer'])
      expect(createdGame.audioLanguages).toEqual(['English', 'Spanish'])
      expect(createdGame.textLanguages).toEqual(['English', 'Spanish'])
      expect(createdGame.releaseDate).toEqual('2019-09-10T00:00:00.000Z')
      expect(createdGame.publishers).toEqual(['66da1c63e9b730782e7dc65e'])
      expect(createdGame.developers).toEqual(['66da1c63e9b730782e7dc65e'])
      expect(createdGame.ageRating).toEqual('66da1deae9b730782e7dc667')
      expect(createdGame.coverUrl).toEqual(
        'https://example.com/gears-5-cover.png'
      )
      expect(createdGame.platforms).toEqual(['66da1ceee9b730782e7dc662'])
    })

    test('Making a post request to “v1/api/games” with wrong data should return validation errors.', async () => {
      const res = await request(app)
        .post('/v1/api/games')
        .send({
          name: 'Gears 5',
          genres: ['Third-person shooter'],
          category:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et',
          gameModes: ['Single-player', 'Multiplayer'],
          audioLanguages: ['English', 'Spanish'],
          releaseDate: '2019-09-10T00:00:00.000Z',
          developers: ['66da1c63e9b730782e7dc65e'],
          platforms: ['66da1ceee9b730782e7dc662']
        })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body.status).toEqual('Bad Request')
      expect(res.body.messages.length).toBeGreaterThan(0)
    })
  })

  describe('PUT', () => {
    test.skip('Doing a put request to “v1/api/games/66da1ea1e9b730782e7dc66b” should return the updated company.', async () => {
      const res = await request(app)
        .put('/v1/api/games/66da1ea1e9b730782e7dc66b')
        .send({
          name: 'Halo: Infinite',
          genres: ['First-person shooter', 'Action'],
          category: 'AAA',
          gameModes: ['Single-player'],
          audioLanguages: ['English', 'French', 'Spanish'],
          textLanguages: ['English', 'French'],
          releaseDate: '2021-12-08T00:00:00.000Z',
          publishers: ['66da1c63e9b730782e7dc65e'],
          developers: ['66da1c63e9b730782e7dc65e'],
          ageRating: '66da1deae9b730782e7dc666',
          coverUrl: 'https://example.com/halo-infinite-cover.png',
          platforms: ['66da1ceee9b730782e7dc663'],
          similarGames: []
        })
        .set('Accept', 'application/json')

      const updatedGame = res.body.data

      expect(res.status).toEqual(201)
      expect(res.body.status).toEqual('Created')
      expect(updatedGame.name).toEqual('Halo: Infinite')
      expect(updatedGame.genres).toEqual(['First-person shooter', 'Action'])
      expect(updatedGame.category).toEqual('AAA')
      expect(updatedGame.gameModes).toEqual(['Single-player'])
      expect(updatedGame.audioLanguages).toEqual([
        'English',
        'French',
        'Spanish'
      ])
      expect(updatedGame.textLanguages).toEqual(['English', 'French'])
      expect(updatedGame.releaseDate).toEqual('2021-12-08T00:00:00.000Z')
      expect(updatedGame.publishers).toEqual(['66da1c63e9b730782e7dc65e'])
      expect(updatedGame.developers).toEqual(['66da1c63e9b730782e7dc65e'])
      expect(updatedGame.ageRating).toEqual('66da1deae9b730782e7dc666')
      expect(updatedGame.coverUrl).toEqual(
        'https://example.com/halo-infinite-cover.png'
      )
      expect(updatedGame.platforms).toEqual(['66da1ceee9b730782e7dc663'])
      expect(updatedGame.similarGames).toEqual([])
    })

    describe('DELETE', () => {
      test.skip('Doing a delete request to “v1/api/games/66da1ea1e9b730782e7dc66b” should return a true indicating that the entity was successfully deleted.', async () => {
        const res = await request(app).delete(
          '/v1/api/games/66da1ea1e9b730782e7dc66b'
        )

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('Deleted')
        expect(res.body.result).toEqual(true)
      })
    })
  })
})