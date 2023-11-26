"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const client_1 = require("@prisma/client");
// import bcrypt from "bcrypt";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// const bcrypt = require("bcrypt");
function signUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const salt = yield bcryptjs_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            console.log("SIGNUP EMAIL:", email);
            console.log("SIGNUP PASS:", password);
            console.log("SIGNUP HASHED PASS:", hashedPassword);
            const existingUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (existingUser) {
                console.error("User already exists");
                return {
                    user: null,
                    message: "User already exists",
                    noError: false,
                };
            }
            const newUser = yield prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                },
            });
            if (newUser) {
                return {
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                    },
                    message: "User Was Created Successfully",
                    noError: true,
                };
            }
            return {
                user: null,
                message: "Error Creating User. Please Try Again Later",
                noError: false,
            };
        }
        catch (err) {
            console.error("Error Creating User. Please Try Again Later:", err);
            return {
                user: null,
                message: "Error Creating User. Please Try Again Later",
                noError: false,
            };
        }
    });
}
exports.signUp = signUp;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                console.error("User not found");
                return {
                    user: null,
                    message: "User not found with the given email",
                    noError: false,
                };
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (isPasswordValid) {
                return {
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    message: "Login successful",
                    noError: true,
                };
            }
            else {
                console.error("Invalid password");
                return {
                    user: null,
                    message: "Invalid password",
                    noError: false,
                };
            }
        }
        catch (err) {
            console.error("Error Fetching User. Please Try Again Later:", err);
            return {
                user: null,
                message: "Error Creating User. Please Try Again Later",
                noError: false,
            };
        }
    });
}
exports.login = login;
