const router = require("express").Router();
const User = require("../models/User"); // Assuming your User model file is named "User.js"
const session = require("express-session");

router.use(
    session({
      secret: "root1234",
      resave: false,
      saveUninitialized: true,
    })
  );
// Add a new user
router.route("/add").post(async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;
    const email = req.body.email;
    const contact = Number(req.body.contact);
    const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User({
        firstname,
        lastname,
        address,
        email,
        contact,
        password,
    });

    newUser
        .save()
        .then(() => {
            res.json('User added');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// Get all users
router.route("/").get((req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/login").post(async (req, res) => { // Use POST method for sending sensitive data
    const { email, password } = req.body;

    try {
        console.log(email + password)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the plain text password
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        req.session.userId = user._id;
        console.log('Session userId:', req.session.userId);
        res.json({ message: "Login successful",userId:user._id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a user by ID
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;
    const email = req.body.email;
    const contact = Number(req.body.contact);
    const password = req.body.password;

    const updateUser = {
        firstname,
        lastname,
        address,
        email,
        contact,
        password
    };

    try {
        await User.findByIdAndUpdate(userId, updateUser);
        res.status(200).json({ status: "User Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error in Updating", error: err.message });
    }
});

// Delete a user by ID
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ status: "User Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error in Deleting", error: err.message });
    }
});

// Get a user by ID
router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ status: "User not found" });
        } else {
            res.json(user);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error in Fetching", error: err.message });
    }
});

module.exports = router;
