import { MongoRepository } from './mongo-repository'
import { mongoConnect, mongoDisconnect, deleteDocs } from './conn/mongo-connect'
import env from '../../../app/config/env'
import { UserModel } from './models/user'

const makeSut = (): any => {
  return new MongoRepository()
}

describe('Mongo Repository', () => {
  beforeAll(async () => {
    await mongoConnect(env.mongoUriTest)
  })
  afterAll(async () => {
    await deleteDocs(UserModel)
    await mongoDisconnect()
  })

  test('should return user id if user is added ', async () => {
    const sut = makeSut()
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    const userAccount = await sut.addUser(user)
    expect(userAccount.id).toBeTruthy()
  })
  test('should find user by email', async () => {
    const sut = makeSut()
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    const userAccount = await sut.find(user.email)
    expect(userAccount.id).toBeTruthy()
    expect(userAccount.email).toBe('any_email')
    expect(userAccount.name).toBe('any_name')
  })
  test('should add token in user ', async () => {
    const sut = makeSut()
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    await sut.addUser(user)
    const userAccount = await sut.find(user.email)
    // expect(userAccount).toBe('w')
    await sut.addToken(userAccount.id, 'token')
    const result = await sut.find(user.email)
    expect(result.accessToken).toBe('token')
  })
})
