"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, "First name is required"),
    last_name: zod_1.z.string().min(1, "Last name is required"),
    address: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid email address")
});
