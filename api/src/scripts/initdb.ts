process.env.NODE_ENV = "script";
const adminGroupName = "Admin";
var groupData: any = [
  {
    name: adminGroupName,
    role: "Officer",
    permissions: {
      login: true,
      admin: true,
      visible: true
    }
  },
  {
    name: "Disabled",
    role: "Member",
    permissions: {
      visible: false
    }
  },
  {
    name: "Alumnus",
    role: "Alumnus",
    permissions: {
      visible: false
    }
  },
  {
    name: "Advisor",
    role: "Advisor",
    permissions: {
      visible: false
    }
  },
  {
    name: "Tutor",
    role: "Tutor",
    permissions: {
      login: true,
      visible: true,
      schedules: "own"
    }
  },
  {
    name: "Head Tutor",
    role: "Tutor",
    permissions: {
      login: true,
      visible: true,
      schedules: "section",
      events: "own"
    }
  },
  {
    name: "Director of Tutoring",
    role: "Officer",
    permissions: {
      login: true,
      visible: true,
      schedules: "all",
      events: "own"
    }
  },
  {
    name: "Director",
    role: "Officer",
    permissions: {
      login: true,
      visible: true,
      events: "own"
    }
  },
  {
    name: "Leader",
    role: "Leader",
    permissions: {
      login: true,
      visible: true,
      events: "all",
      announcements: "all",
      members: true
    }
  }
]

if (process.argv.length < 5) {
  console.log("Missing some command line arguments")
  console.log("node initdb.js [databaseAddress] [adminFirstName] [adminLastName] [adminEmail] [adminUserPassword]")
  console.log();
  console.log("databaseAddress    Use 'mongodb://localhost:27000/ieeeutd' for most circumstances.")
  process.exit(1);
}

const databaseAddress = process.argv[2];
var adminUserData: any = {
  firstName: process.argv[3],
  lastName: process.argv[4],
  email: process.argv[5],
  memberSince: 2019
}
const adminUserPassword = process.argv[6];

//MongoDB
var mongoose = require('mongoose');
const easyPbkdf2 = require('easy-pbkdf2')();

//Connect to DB server
//Disable auto-indexing to improve performance
mongoose.connect(databaseAddress, { config: { autoIndex: false } });

//Load schema
const { Group, Member } = require('../models/index.js');

//Connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

db.once('open', async () => {
  try {
    console.log("Database ready");

    //create missing groups
    for (var group of groupData) {
      let existingGroup = await Group.findOne({ name: group.name });
      if (!existingGroup) {
        group.dateCreated = Date.now();

        console.log("Creating group", group.name)
        let newGroup = Group(group);
        await newGroup.save();
      }
    }

    //create admin user if necessary
    const adminGroupId = await Group.findOne({ name: adminGroupName });
    if (!adminGroupId) {
      console.error("Admin group not found")
      process.exit(1);
    }
    const adminMemberCount = await Member.countDocuments({ });

    const createAdminFunction = () => {
      return new Promise((resolve, reject) => {
        easyPbkdf2.secureHash(adminUserPassword, (err: any, passwordHash: any, passwordSalt: any) => {
          if (err) return reject(err);
          adminUserData.dateCreated = Date.now();
          adminUserData.passwordSalt = passwordSalt;
          adminUserData.passwordHash = passwordHash;
          adminUserData.group = adminGroupId;

          var staff = Member(adminUserData);

          staff.save()
          .then(resolve)
          .catch(reject);
        });
      })
    }

    if (adminMemberCount == 0) {
      console.log("Creating admin user")
      await createAdminFunction();
    }

    console.log("Done! Exiting gracefully...");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
});
