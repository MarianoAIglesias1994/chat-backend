import { UserController } from "../controllers/user.controller";
import { HealthController } from "../controllers/health.controller";
import { AuthController } from "../controllers/auth.controller";
import { MessageController } from "../controllers/message.controller";
import passport from "passport";

export class Routes {
  public healthController: HealthController = new HealthController();
  public userController: UserController = new UserController();
  public authController: AuthController = new AuthController();
  public messageController: MessageController = new MessageController();

  public routes(app): void {
    app
      .route("/login")
      .post(
        passport.authenticate("login", { session: false }),
        this.authController.login
      );
    app.route("/check").post(this.healthController.check);
    app
      .route("/users")
      .get(this.userController.getAllUsers)
      .post(
        passport.authenticate("register", { session: false }),
        this.userController.createUser
      );
    app
      .route("/user/:id")
      .get(this.userController.getUser)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
    app
      .route("/messages")
      .post(
        passport.authenticate("bearer", { session: false }),
        this.messageController.sendMessage
      )
      .get(
        passport.authenticate("bearer", { session: false }),
        this.messageController.getMessages
      );
  }
}
