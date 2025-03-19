import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = {}; // In-memory user store

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!users[email]) {
    users[email] = { email, password }; // Save user
  }

  if (users[email].password !== password) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ token: "fake-jwt-token", user: { email } });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
