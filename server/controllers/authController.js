const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const user = await db.check_user(email);
    if (!user[0]) {
      return res.status(401).send("Incorrect credentials");
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (authenticated) {
        req.session.user = {
          userId: user[0].user_id,
          email: user[0].email,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Email or password incorrect");
      }
    }
  },

  register: async (req, res) => {
    const db = req.app.get('db');
    const {firstName, lastName, email, password} = req.body;
    const existingUser = await db.check_user(email);
    if(existingUser[0]){
        return res.status(409).send('User already exists')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    const [newUser] = await db.create_user([firstName, lastName, email, hash])
    req.session.user = {
        userId: newUser.user_id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name
    }
    res.status(200).send(req.session.user)
},

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(404);
    }
  },
};
