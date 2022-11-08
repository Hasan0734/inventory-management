const { signupService, findUserByEmail } = require("../services/user.service");
const bcrypt = require('bcryptjs');

const { generateToken } = require("../utils/token");
const { sendMailWithMailGun } = require("../utils/email");


exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    const mailData = {
      to: [user.email],
      subject: "Verify your Account",
      text: "Thank you"
    }

    // sendMailWithMailGun(mailData)

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

/**
 *
 * 1. Ccheck if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare passwrod
 * 5. if password not correct se res
 * 6. check if user is active
 * 7. if not active send res 
 * 8. gemerate token 
 * 9. send user and token 
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(401).json({
        status: 'fail',
        error: 'Please provde your credentials'
      })
    }
    const user = await findUserByEmail(email);
console.log(user);
    if (!user) {
       return res.status(401).json({
         status: "fail",
         error: "No user found. Please create an account",
       });
    }

    const isPasswordValid = user.comparePassword(password, user.password)

// console.log(user.password);

    if (!isPasswordValid) {
        return res.status(403).json({
          status: "fail",
          error: "Passwrod is not currect",
        });
    }

    if (user.status !=="active" ) {
       return res.status(401).json({
         status: "fail",
         error: "Your account is not active yet.",
       });
    }


    const token = generateToken(user);
    const {password: pwd, ...others} = user.toObject()

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};


exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req?.user?.email);
    res.status(200).json({
      status: "success",
      data: user
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error
    })
  }
}