import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export class AuthController {
  static async authenticate(request: Request, response: Response) {
    const repository = getRepository(User);

    const { email, password } = request.body;

    const user = await repository.findOne(
      { email },
      { select: ["id", "email", "password"] }
    );

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const { password: oldPassword, ...userResponse } = user;

    const token = sign(
      {
        id: user.id,
      },
      "secret",
      { expiresIn: "1d" }
    );

    return response.json({
      userResponse,
      token,
    });
  }
}
