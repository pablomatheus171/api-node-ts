import { AddTokenInDatabase } from '../domain/useCases/db/add-user-token-in-database'
import { AddUserTokenRepository } from './add-user-token'
class DatabaseRepository implements AddTokenInDatabase {
  async addToken (id: string, token: string): Promise<void> {

  }
}

describe('add user token repository', () => {
  test('should database repository with correct values', async () => {
    const databaseRepository = new DatabaseRepository()
    const sut = new AddUserTokenRepository(databaseRepository)
    const addSpy = jest.spyOn(databaseRepository, 'addToken')
    const values = { user_id: 'user_id', token: 'token' }
    await sut.addToken(values.user_id, values.token)
    expect(addSpy).toHaveBeenCalledWith('user_id', 'token')
  })
  test('should throw if database repository throws', async () => {
    const databaseRepository = new DatabaseRepository()
    const sut = new AddUserTokenRepository(databaseRepository)
    jest.spyOn(databaseRepository, 'addToken')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const values = { user_id: 'user_id', token: 'token' }
    const result = sut.addToken(values.user_id, values.token)
    await expect(result).rejects.toThrow()
  })
})
