const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);

    res.status(201).redirect('/login')
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          //user session
          req.session.userID=user._id
          res.status(200).redirect('/users/dashboard');
        } else {
          res.status(400).json({
            status: "failed",
            err,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.logoutUser=(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}
exports.getDashboardPage =async  (req, res) => {
  const user=await User.findOne({_id:req.session.userID})
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user
  });
};
