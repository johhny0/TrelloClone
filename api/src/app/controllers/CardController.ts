import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Card } from "../models/Card";
import { List } from "../models/List";

export class CardController {
  static async index(request: Request, response: Response) {
    const repository = getRepository(Card);

    const cards = await repository.find();

    return response.json(cards);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    const repository = getRepository(Card);

    const card = await repository.findOne(id, { relations: ["list"] });

    return response.json(card);
  }

  static async store(request: Request, response: Response) {
    const repositoryList = getRepository(List);
    const repository = getRepository(Card);

    const { title, description, listId } = request.body;

    const list = await repositoryList.findOne(listId);

    const card = repository.create({ title, description, list });

    await repository.save(card);

    return response.json(card);
  }

  static async update(request: Request, response: Response) {
    const repositoryList = getRepository(List);
    const repository = getRepository(Card);

    const { title, description, listId } = request.body;

    const { id } = request.params;

    const list = await repositoryList.findOne(listId);

    await repository.update(id, { title, description, list });

    const card = await repository.findOne(id, { relations: ["list"] });

    return response.json(card);
  }

  static async remove(request: Request, response: Response) {
    const repository = getRepository(Card);

    const { id } = request.params;

    await repository.delete(id);

    return response.send();
  }
}
