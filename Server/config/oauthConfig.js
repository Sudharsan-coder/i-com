const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_BASE_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Extract email from Google profile
        const email = profile.emails[0].value;
        let isNewUser = false;

        // Check if user already exists
        let user = await User.findOne({ emailId: email });

        if (!user) {
          // If user doesn't exist, create a new user
          const newUser = new User({
            emailId: email,
            firstName: profile?.name?.givenName || "",
            lastName: profile?.name?.familyName || "",
            googleId: profile.id, // Store Google ID for future lookups
            profilePicUrl: profile.photos[0]?.value || "", // Optional: Profile photo
            userName:email.split('@')[0] || `user_${profile.id}`,
          });
          user = await newUser.save();
          // console.log({...newUser});
          
          isNewUser=true
        }

        return done(null, {...user,isNewUser}); // Pass the user object to be stored in req.user
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

//Passport uses sessions to track authenticated users across requests. The next two functions, serializeUser and deserializeUser, are responsible for managing the session data.

passport.serializeUser((user, done) => {
  //This function is called after a user has been authenticated. It determines what data of the user should be stored in the session.
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  //This function is called on every request once a user is authenticated. It retrieves the user information from the session.
  try { 
    done(null, user); // Pass the full user object to req.user
  } catch (err) {
    done(err, null);
  }
});

module.exports = { passport };
