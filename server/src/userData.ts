import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type TUserData = {
  user: {
    id: string;
    email: string;
  } | null;
  message: string;
  noError: boolean;
};

export type TFavorites = {
  data:
    | {
        name: string;
        key: string;
      }[]
    | null;
  message: string;
  noError: boolean;
};

const prisma = new PrismaClient();

export async function signUp(
  email: string,
  password: string
): Promise<TUserData> {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await prisma.user.findUnique({
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

    const newUser = await prisma.user.create({
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
  } catch (err) {
    console.error("Error Creating User. Please Try Again Later:", err);
    return {
      user: null,
      message: "Error Creating User. Please Try Again Later",
      noError: false,
    };
  }
}

export async function login(
  email: string,
  password: string
): Promise<TUserData> {
  try {
    const user = await prisma.user.findUnique({
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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return {
        user: {
          id: user.id,
          email: user.email,
        },
        message: "Login successful",
        noError: true,
      };
    } else {
      console.error("Invalid password");
      return {
        user: null,
        message: "Invalid password",
        noError: false,
      };
    }
  } catch (err) {
    console.error("Error Fetching User. Please Try Again Later:", err);
    return {
      user: null,
      message: "Error Creating User. Please Try Again Later",
      noError: false,
    };
  }
}

export async function fetchFavorites(userId: string): Promise<TFavorites> {
  try {
    const user = await prisma.user.findUnique({
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
  } catch (err) {
    console.error("Error fetching favorites", err);
    return {
      data: null,
      message: "Error fetching favorites",
      noError: false,
    };
  }
}

export async function addFavorite(userId: string, name: string, key: string) {
  try {
    const user = await prisma.user.findUnique({
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

    const newFavorite = await prisma.favorite.create({
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

    const favorites = await prisma.favorite.findMany({
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
  } catch (error) {
    console.error("Error adding favorite:", error);
    return {
      data: null,
      message: "Error adding favorite",
      noError: false,
    };
  }
}

export async function removeFromFavorites(userId: string, key: string) {
  try {
    const user = await prisma.user.findUnique({
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

    const favoriteToDelete = user.favorites.find(
      (favorite) => favorite.key === key
    );

    if (!favoriteToDelete) {
      console.error("Favorite not found");
      return {
        data: null,
        message: "Favorite Not Found",
        noError: false,
      };
    }

    const deletedFavorite = await prisma.favorite.delete({
      where: {
        id: favoriteToDelete.id,
      },
    });
    console.log("Favorite deleted:", deletedFavorite);

    const updatedFavorites = user.favorites.filter(
      (favorite) => favorite.key !== key
    );

    return {
      data: updatedFavorites.map((favorite) => ({
        name: favorite.name,
        key: favorite.key,
      })),
      message: "Favorite removed successfully",
      noError: true,
    };
  } catch (err) {
    console.error("Error removing favorite:", err);
    return {
      data: null,
      message: "Error removing favorite",
      noError: false,
    };
  }
}
