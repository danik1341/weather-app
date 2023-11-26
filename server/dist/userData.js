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
exports.removeFromFavorites = exports.addFavorite = exports.fetchFavorites = exports.login = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function signUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const salt = yield bcryptjs_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
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
function fetchFavorites(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    favorites: {
                        select: {
                            name: true,
                            key: true,
                        },
                    },
                },
            });
            if (!user) {
                console.error("User not found");
                return {
                    data: null,
                    message: "No User Found",
                    noError: false,
                };
            }
            const favorite = user.favorites.map((favorite) => ({
                name: favorite.name,
                key: favorite.key,
            }));
            return {
                data: favorite,
                message: "Favorites fetched successfully",
                noError: true,
            };
        }
        catch (err) {
            console.error("Error fetching favorites", err);
            return {
                data: null,
                message: "Error fetching favorites",
                noError: false,
            };
        }
    });
}
exports.fetchFavorites = fetchFavorites;
function addFavorite(userId, name, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                console.error("User not found");
                return {
                    data: null,
                    message: "No User Found",
                    noError: false,
                };
            }
            const newFavorite = yield prisma.favorite.create({
                data: {
                    name,
                    key,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            console.log("New favorite added:", newFavorite);
            const favorites = yield prisma.favorite.findMany({
                where: {
                    userId,
                },
                select: {
                    name: true,
                    key: true,
                },
            });
            return {
                data: favorites,
                message: "Favorite added successfully",
                noError: true,
            };
        }
        catch (error) {
            console.error("Error adding favorite:", error);
            return {
                data: null,
                message: "Error adding favorite",
                noError: false,
            };
        }
    });
}
exports.addFavorite = addFavorite;
function removeFromFavorites(userId, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    favorites: true,
                },
            });
            if (!user) {
                console.error("User not found");
                return {
                    data: null,
                    message: "No User Found",
                    noError: false,
                };
            }
            const favoriteToDelete = user.favorites.find((favorite) => favorite.key === key);
            if (!favoriteToDelete) {
                console.error("Favorite not found");
                return {
                    data: null,
                    message: "Favorite Not Found",
                    noError: false,
                };
            }
            const deletedFavorite = yield prisma.favorite.delete({
                where: {
                    id: favoriteToDelete.id,
                },
            });
            console.log("Favorite deleted:", deletedFavorite);
            const updatedFavorites = user.favorites.filter((favorite) => favorite.key !== key);
            return {
                data: updatedFavorites.map((favorite) => ({
                    name: favorite.name,
                    key: favorite.key,
                })),
                message: "Favorite removed successfully",
                noError: true,
            };
        }
        catch (err) {
            console.error("Error removing favorite:", err);
            return {
                data: null,
                message: "Error removing favorite",
                noError: false,
            };
        }
    });
}
exports.removeFromFavorites = removeFromFavorites;
