"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const migrations_1 = require("./db/migrations"); // Add this import
const startupScreen_1 = require("./utils/startupScreen");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
// Initialize database before starting server
const startServer = async () => {
    try {
        await (0, migrations_1.initializeDatabase)();
        app.listen(PORT, () => {
            (0, startupScreen_1.displayStartupScreen)();
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
    }
};
startServer();
