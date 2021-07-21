import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class UserController {
  public createUser(req: Request, res: Response) {
    res.send({
      // @ts-ignore
      id: req.user.id,
    });
  }
  public getAllUsers(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) => res.status(500).json(err));
  }
  public getUser(req: Request, res: Response) {
    const userId: string = req.params.id;
    User.findByPk<User>(userId)
      .then((user: User | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ errors: "User not found" });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }
  public updateUser(req: Request, res: Response) {
    const userId: string = req.params.id;
    const params: UserInterface = req.body;
    const update: UpdateOptions = {
      where: { id: userId },
      limit: 1,
    };
    User.update(params, update)
      .then(() => res.status(202).json({ data: "Success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
  public deleteUser(req: Request, res: Response) {
    const userId: string = req.params.id;
    const options: DestroyOptions = {
      where: { id: userId },
      limit: 1,
    };
    User.destroy(options)
      .then(() => res.status(204).json({ data: "Success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
