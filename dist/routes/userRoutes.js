"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
// POST /users - Create a new user
router.post("/", async (req, res) => {
    try {
        const validatedData = user_1.UserSchema.parse(req.body);
        const { first_name, last_name, address, phone, email } = validatedData;
        const query = `
        INSERT INTO users (first_name, last_name, address, phone, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
        const values = [first_name, last_name, address, phone, email];
        const result = await db_1.default.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "Invalid user data",
        });
    }
});
// GET /users - Retrieve all users
router.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM users ORDER BY created_at DESC";
        const result = await db_1.default.query(query);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});
exports.default = router;
