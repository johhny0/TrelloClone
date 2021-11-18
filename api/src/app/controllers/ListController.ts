import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { List } from "../models/List";
import { User } from "../models/User";

export class ListController {
  static async index(request: Request, response: Response) {
    const repository = getRepository(List);

    const lists = await repository.find();

    return response.json(lists);
  }

  static async show(request: Request, response: Response) {
    const repository = getRepository(List);

    const { id } = request.params;

    const list = await repository.findOne(id, { relations: ["user", "cards"] });

    return response.json(list);
  }
  static async store(request: Request, response: Response) {
    const repository = getRepository(List);
    const userRepository = getRepository(User);

    const { name } = request.body;
    const { userId } = request;
    const user = await userRepository.findOne(userId);

    const list = repository.create({ name, user });

    await repository.save(list);

    return response.json(list);
  }

  static async update(request: Request, response: Response) {
    const repository = getRepository(List);
    const userRepository = getRepository(User);

    const { name } = request.body;
    const { id } = request.params;
    const { userId } = request;
    const user = await userRepository.findOne(userId);

    await repository.update(id, { name, user });

    const list = await repository.findOne(id);

    return response.json(list);
  }

  static async remove(request: Request, response: Response) {
    const repository = getRepository(List);

    const { id } = request.params;

    await repository.delete(id);

    return response.send();
  }
}
