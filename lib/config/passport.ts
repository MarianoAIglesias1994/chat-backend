import { User } from "../models/user.model";

import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
import jwt from "jwt-simple";
import bcrypt from "bcrypt";

const SECRET = String(process.env.SECRET);
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

// TODO: Improve token generation -> add expiration time

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
                  console.log("Passwords do not match");
                  return done(null, false, {
                    message: "Passwords do not match",
                  });
                }
                console.log("User found & authenticated");
                return done(null, {
                  id: user.id,
                  token: jwt.encode({ username }, SECRET),
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
                console.log("Username already taken");
                return done(null, false, {
                  message: "Username already taken",
                });
              } else {
                bcrypt
                  .hash(password, BCRYPT_SALT_ROUNDS)
                  .then((hashedPassword) => {
                    User.create({
                      username: req.body.username,
                      password: hashedPassword,
                    }).then((user) => {
                      console.log("User created");
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
          const { username } = jwt.decode(token, SECRET);
          User.findOne<User>({
            where: {
              username: username,
            },
          }).then((user: User | null) => {
            if (user === null) {
              return done(null, false, { message: "Username does not exist" });
            } else {
              done(null, user);
            }
          });
        } catch (error) {
          console.log(error);
          return done(null, false, { message: "Invalid token" });
        }
      })
    );
  }
}
