import { AddTokenInDatabase } from '../../../domain/useCases/db/add-user-token-in-database'
import { AddUserInDatabase } from '../../../domain/useCases/db/add-user-in-database'
import { FindUserByEmailInDatabase } from '../../../domain/useCases/db/find-user-by-email-in-database'
import { UserModel } from './models/user'

export class MongoRepository implements
 AddUserInDatabase,
 FindUserByEmailInDatabase,
 AddTokenInDatabase {
  async addToken (id: any, token: string): Promise<void> {
    await UserModel.findOneAndUpdate({ _id: id }, { $set: { accessToken: token } })
  }

  async find (email: string): Promise<any> {
    const user = await UserModel.findOne({ email })
    return user
  }

  async addUser (input: any): Promise<any> {
    const { name, email, password } = input

    await UserModel.create({ name, email, password })
    const user = await this.find(email)

    return {
      id: user.id

    }
  }
}
