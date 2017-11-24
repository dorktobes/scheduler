const db = require('../database');
const Promise = require('bluebird');
const crypto = require('crypto');

const getAllUsers = (req, res, next) => {
  db.User.findAll({})
    .then((allUsers) => {
      req.users = allUsers;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const getAllScheduleDates = (req, res, next) => {
  db.Schedule.findAll({})
    .then((allScheduleDates) => {
      req.scheduleDates = allScheduleDates;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const getAllNeededEmployees = (req, res, next) => {
  db.Needed_Employee.findAll({})
    .then((allNeededEmployees) => {
      req.neededEmployees = allNeededEmployees;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting neededEmployees');
    });
};

const getAllEmployeeAvailabilities = (req, res, next) => {
  db.Employee_Availability.findAll({})
    .then((allEmployeeAvailabilities) => {
      req.employeeAvailabilities = allEmployeeAvailabilities;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const getAllDayParts = (req, res, next) => {
  db.Day_Part.findAll({})
    .then((allDayParts) => {
      req.dayParts = allDayParts;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const addUser = (req, res, next) => {
  db.User.create({
    name: req.body.username,
    role: 'employee',
    password: null,
  })
    .then((user) => {
      req.user = user;
      next();
    }).catch((err) => {
      res.end(500, `Error adding new user: ${err}`);
    });
};

const addEmployeeAvailability = (req, res, next) => {
  const parsedUserId = JSON.parse(JSON.stringify(req.user)).id;
  const parsedDayPartsKeys = Object.keys(req.dayParts);
  req.employeeAvailability = {};
  Promise.each(parsedDayPartsKeys, (key) => {
    const id = JSON.parse(key) + 1;
    return db.Employee_Availability.create({
      is_available: false,
      user_id: parsedUserId,
      day_part_id: id,
    })
      .then((availability) => {
        req.employeeAvailability[key] = availability;
      })
      .catch((err) => {
        res.status(500).send(`error adding availability for daypartid ${id}: ${err}`);
      });
  })
    .then(() => {
      console.log(`req.employeeAvailability: ${req.employeeAvailability}`)
      next();
    }).catch((err) => {
      res.status(500).send(`error adding availability for user ${parsedUserId}: ${err}`);
    });
};

// Takes new employeeAvailabilities and updates them in the database
const updateEmployeeAvailability = (req, res, next) => {
  return Promise.each(req.body.employeeAvailabilities, (employeeAvail) => {
    const updates = { is_available: employeeAvail.is_available };
    const conditions = {
      where: {
        user_id: employeeAvail.user_id,
        day_part_id: employeeAvail.day_part_id,
      },
    };
    return db.Employee_Availability.update(updates, conditions);
  }).then((updatedAvailabilities) => {
    req.empoloyeeAvailabilities = updatedAvailabilities;
    next();
  });
};

const newSession = (req, res) => {
  let session = {};
  session.session = crypto.randomBytes(32).toString('hex');
  session.user = null;
  res.cookie('shiftly', session.session);
  console.log('session', session);
  return session;
};

const checkSession = (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (req.cookies['shiftly']) {
      resolve(db.Sessions.findAll( {where: { session: req.cookies['shiftly'] } }));
    } else {
      resolve([]);
    }
  })
  .then((session) => {
    if (session.length > 0) {
      db.User.findAll({ where: { id: session[0].dataValues.user_id}})
      .then((user) => {
        let obj =  { session: session[0].dataValues.session }; 
        if (user.length) {
          obj.user = user[0].dataValues.name;
        }
        
        req.session = obj;
        next();
      })
    } else {
      req.session = newSession(req, res);
      next();
    }
  })
};

const passHash = (password) => {
  let shasum = crypto.createHash('sha256');
  shasum.update(password);
  return shasum.digest('hex');
}

const authenticate = (req, res, next) => {
  //get user info from user db;
  if (req.session.user) {
    next();
    return;
  }
  db.User.findAll({ where: {name: req.body.creds.username} })
  .then((user) => {
    if (user.length === 0) {
      res.status(201).send({ flashMessage: 'incorrect username or password'});
      return;
    }
    user = user[0].dataValues;
    if (passHash(req.body.creds.password) === user.password) {
      req.session.user = user.name;
      req.session.role = user.role;
      console.log(req.session);
      db.Sessions.create({session: req.session.session, user_id: user.id})
      .then(() => {
        next();
      })
    } else {
      res.status(201).send({ flashMessage: 'incorrect username or password'});
    }
  })
};

const createUser = (req, res, next) => {
  db.User.create({
    name: req.body.creds.username,
    role: 'manager',
    password: passHash(req.body.creds.password)
  }).then((data) => {
    req.session.user = req.body.creds.username;
    req.session.role =data.dataValues.role;
    db.Sessions.create({session: req.session.session, user_id: data.dataValues.id})
    .then(() => {
      next();
    })
  }).catch((err) => {
    res.status(201).send({ flashMessage: `username "${req.body.creds.username}" already exists`})
  })
};

const redirectIfLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.send();
    return;
  } 
  console.log('redirecting');
  next();
};


module.exports = {
  redirectIfLoggedIn: redirectIfLoggedIn,
  createUser: createUser,
  authenticate: authenticate,
  getAllUsers: getAllUsers,
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
  getAllNeededEmployees: getAllNeededEmployees,
  getAllScheduleDates: getAllScheduleDates,
  addUser: addUser,
  addEmployeeAvailability: addEmployeeAvailability,
  checkSession: checkSession,
};
