import { Request, Response } from "express";

export class AuthController {
  public login(req: Request, res: Response) {
    res.send({
      // @ts-ignore
      id: req.user.id,
      // @ts-ignore
      token: req.user.token,
    });
  }
}
