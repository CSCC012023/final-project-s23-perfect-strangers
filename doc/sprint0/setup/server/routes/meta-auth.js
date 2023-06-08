// Get dependencies
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookUserModel = require('../models/facebookUsersModel');

/*     
    STEP 1: Need to create a new facebook strategy
    - clientID: APP ID from developer's account
    - clientSecret: APP SECRET from developer's account
    - callbackURL: where facebook will send the requested information
    - profileFields: Information that our app requires from facebook
*/

passport.use(
    new FacebookStrategy ({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CB_URL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, 
    async function(accessToken, refreshToken, profile, cb){
        const userExists = facebookUserModel.findOne({
            accountId: profile.id,
            provider: 'facebook'
        });

        if (!userExists){
            console.log("Adding new facebook user to database")
            const newUser = new facebookUserModel({
                accountId: profile.id,
                username: profile.displayName,
                provider: profile.provider,
            });

            await newUser.save();
            return cb(null, profile);
        }
        else{
            console.log("Facebook user already in Database");
            return cb(null, profile);
        }
    }
    )
);

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect('/auth/facebook/success');
  }
);


module.exports = router;