import { User } from "../models/user.model";

import passport from "passport";
import passportLocal from "passport-local";
import passportHttpBearer from "passport-http-bearer";
import jwt from "jwt-simple";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportHttpBearer.Strategy;

export class PassportCfg {
  public config(): void {
    passport.use(
      "login",
      new LocalStrategy((username, password, done) => {
        User.findOne<User>({
          where: {
            username: username,
          },
          raw: true,
          rejectOnEmpty: true,
        }).then((user: User | null) => {
          if (user === null) {
            return done(null, false, { message: "Username does not exist" });
          } else {
            bcrypt
              .compare(password, user.password)
              .then((response) => {
                if (response !== true) {
                  return done(null, false, {
                    message: "Passwords do not match",
                  });
                }
                const currentDateSeconds = Date.now() / 1000;
                return done(null, {
                  id: user.id,
                  token: jwt.encode(
                    {
                      nbf: currentDateSeconds,
                      exp:
                        currentDateSeconds +
                        parseInt(process.env.TOKEN_TTL_SECS),
                    },
                    process.env.SECRET
                  ),
                });
              })
              .catch((err: Error) => console.log(err));
          }
        });
      })
    );
    passport.use(
      "register",
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true,
          session: false,
        },
        (req, username, password, done) => {
          try {
            User.findOne({
              where: {
                username: username,
              },
            }).then((user) => {
              if (user != null) {
                return done(null, false, {
                  message: "Username already taken",
                });
              } else {
                bcrypt
                  .hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
                  .then((hashedPassword) => {
                    User.create({
                      username: req.body.username,
                      password: hashedPassword,
                    }).then((user) => {
                      return done(null, user);
                    });
                  });
              }
            });
          } catch (err) {
            done(err);
          }
        }
      )
    );
    passport.use(
      new BearerStrategy({ passReqToCallback: true }, (req, token, done) => {
        try {
          jwt.decode(token, process.env.SECRET);
          return done(null, true);
        } catch (error) {
          console.log(error);
          return done(null, false, { message: "Invalid token" });
        }
      })
    );
  }
}
