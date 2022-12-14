import request from 'supertest'
import app from '../../config/app'
import { hash } from 'bcrypt'
import { deleteDocs, mongoConnect, mongoDisconnect } from '../../../implementations/db/mongo/conn/mongo-connect'
import { UserModel } from '../../../implementations/db/mongo/models/user'
import env from '../../config/env'

describe('Register route', () => {
  beforeAll(async () => {
    await mongoConnect(env.mongoUriTest)
  })
  afterAll(async () => {
    await deleteDocs(UserModel)
    await mongoDisconnect()
  })

  test('Should return 201 if user added', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Pablo',
        email: 'pablomatheus18koe@gmail.com',
        password: '123'
      })
      .expect(201)
  })
  test('Should return 400 if no name is provided', async () => {
    await request(app)
      .post('/register')
      .send({
        email: 'pablomatheus18koe@gmail.com',
        password: '123'
      })
      .expect(400)
  })
  test('Should return 400 if no email is provided', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Pablo',
        password: '123'
      })
      .expect(400)
  })
  test('Should return 400 if no password is provided', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Pablo',
        email: 'pablomatheus18koe@gmail.com'

      })
      .expect(400)
  })
  test('Should return 400 if invalid email is provided', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Pablo',
        email: 'pablomatheus18koe',
        password: '123'
      })
      .expect(400)
  })
  test('Should return 400 if invalid email already exists', async () => {
    const hashPassword = await hash('123', 12)
    await UserModel.create({
      name: 'Pablo',
      email: 'pablomatheus144@gmail.com',
      password: hashPassword
    })
    await request(app)
      .post('/register')
      .send({
        name: 'Pablo',
        email: 'pablomatheus144@gmail.com',
        password: '123'
      })
      .expect(400)
  })
})
