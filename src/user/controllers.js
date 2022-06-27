const jwt = require("jsonwebtoken");
const User = require("./model");

//The controller receives the request and it must sends a response. If it dosen't it will never finish running
exports.createUser = async (req, res) => {   //req - request    res - response
  try {
    // console.log(req.body.message);
    const userObj = {
      username: req.body.username, 
      email: req.body.email, 
      password: req.body.password
    };
    const newUser = await User.create(userObj);
    const token = await jwt.sign({id: newUser._id}, process.env.SECRET);
    console.log(token);
    res.send({ newUser, token });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// The method in Isomnia or Thunder Claud must be changed to "DELETE" (must not be "POST", "GET" or any other)
exports.deleteUser = async (req, res) => { 
  try {
    await User.deleteOne(req.params.username)
    console.log("Account has been Successfully Deleted!")
    res.send();
  } catch (error){ 
    console.log(error)
    res.send({error});
  } 
};

exports.updateUser = async (req, res) => { 
try { 
  const userObj = { 
    username: req.body.username,
    updatedUsername: req.body.updatedUsername
   }; 
    console.log(userObj);
  let response = await User.findOneAndUpdate ({
    username:userObj.username}, {$set: {username: userObj.updatedUsername}}, {new: true});
    await User.findOne({username:userObj.updatedUsername});
    res.json(response);
  } catch (error){ 
    console.log(error);
    res.send({error});
  }
};

exports.tokenLogin = async (req, res) => {
  const token = await jwt.sign({id: req.user._id}, process.env.SECRET);
  res.send({ user: req.user });
};