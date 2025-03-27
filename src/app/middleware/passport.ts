import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../modules/auth/auth.model";
import passport from "passport";
import config from "../config";
import { TJWTPayload } from "../utils/generateToken";
import { sendResponse } from "../utils/sendResponse";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.access_token_secret as string,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload: TJWTPayload, done:any) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
