import { Controller } from '../../presentation/interfaces/controller'
import { HttpRequest } from '../../presentation/helpers/http-protocols'
import { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RequestAndResponseAdapter {
  static execute (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body
      }

      const httpResponse = await controller.handle(httpRequest)
      if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({ error: httpResponse.body })
      }
    }
  }
}
