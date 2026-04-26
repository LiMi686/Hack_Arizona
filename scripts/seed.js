/* eslint-disable no-console */
require("dotenv").config({ path: require("path").join(__dirname, "../model/.env") });
require("../db");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Coursework = require("../models/Coursework");

async function seed() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const coursework = {
    slug: "food-bank-foundations",
    title: "Food Bank Foundations",
    description: "Learn core terms and flow of a food bank visit.",
    language: "en",
    level: 1,
    isPublished: true,
    units: [
      {
        slug: "unit-1",
        title: "Getting Started",
        description: "Basics and first-day wins.",
        order: 1,
        lessons: [
          {
            slug: "basics-1",
            title: "Basics 1",
            description: "Greetings and key phrases.",
            xp: 10,
            order: 1,
            isPublished: true,
            content: { type: "quiz", questions: 5 },
          },
          {
            slug: "basics-2",
            title: "Basics 2",
            description: "Listening and matching.",
            xp: 15,
            order: 2,
            isPublished: true,
            content: { type: "quiz", questions: 7 },
          },
          {
            slug: "food-bank-tour",
            title: "Food Bank Tour",
            description: "Vocabulary you'll see on site.",
            xp: 20,
            order: 3,
            isPublished: true,
            content: { type: "lesson", sections: 4 },
          },
        ],
      },
    ],
  };

  // ── Coordinators ──────────────────────────────────────────
  const coordinators = [
    { username: "LIMI",     email: "limi@arizona.edu",        role: "coordinator" },
    { username: "Tanmay",   email: "tanmay@arizona.edu",      role: "coordinator" },
    { username: "Nilotpal", email: "nilotpal18@arizona.edu",  role: "coordinator" },
  ];

  // ── Participants (from participants collection) ────────────
  const participantUsers = [
    { username: "Maria Chen",    email: "maria.chen@email.com" },
    { username: "James Nguyen",  email: "james.nguyen@email.com" },
    { username: "Amara Osei",    email: "amara.osei@email.com" },
    { username: "Sofia Reyes",   email: "sofia.reyes@email.com" },
    { username: "Derek Johnson", email: "derek.johnson@email.com" },
    { username: "Linda Yazzie",  email: "linda.yazzie@email.com" },
    { username: "Carlos Mendez", email: "carlos.mendez@email.com" },
    { username: "Tanya Williams",email: "tanya.williams@email.com" },
    { username: "Marcus Hill",   email: "marcus.hill@email.com" },
    { username: "Rosa Flores",   email: "rosa.flores@email.com" },
  ].map(u => ({ ...u, role: "user" }));

  const allUsers = [
    ...coordinators.map(u => ({ ...u, passwordHash, streakCount: 0, xp: 0, level: 1, progress: {} })),
    ...participantUsers.map(u => ({ ...u, passwordHash, streakCount: 0, xp: 0, level: 1, progress: {} })),
  ];

  const emails = allUsers.map(u => u.email);
  const del = await User.deleteMany({ email: { $in: emails } });
  const ins = await User.insertMany(allUsers);

  // Upsert coursework
  await Coursework.findOneAndUpdate(
    { slug: coursework.slug },
    coursework,
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  console.log(`Deleted ${del.deletedCount} existing users`);
  console.log(`Inserted ${ins.length} users:`);
  console.log(`  - ${coordinators.length} coordinators (LIMI, Tanmay, Nilotpal)`);
  console.log(`  - ${participantUsers.length} participants`);
}

seed()
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
    process.exitCode = 1;
  });
