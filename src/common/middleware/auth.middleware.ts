import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    if (req.session.token !== process.env.SECRET_KEY) {
      res.status(302).redirect('/admin/login');
    } else {
      next();
    }
  }
}
