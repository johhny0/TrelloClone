import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export class UserController {
  static async index(request: Request, response: Response) {
    const repository = getRepository(User);

    const users = await repository.find();

    return response.json(users);
  }

  static async show(request: Request, response: Response) {
    const repository = getRepository(User);

    const { id } = request.params;

    const user = await repository.findOne(id, {
      relations: ["lists.cards"],
    });

    return response.json(user);
  }

  static async store(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const repository = getRepository(User);

    const userExists = await repository.findOne({ email });

    if (userExists) {
      return response.sendStatus(409);
    }

    const user = repository.create({ email, password, name });

    await repository.save(user);

    return response.json(user);
  }

  //   async update(request: Request, response: Response) {}
  //   async delete(request: Request, response: Response) {}
}
