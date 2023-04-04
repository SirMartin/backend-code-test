import { Filter } from "mongodb";
import MongoDbClient from "../../../shared/infrastructure/persistance/MongoDbClient";
import Genially from "../domain/Genially";
import GeniallyId from "../domain/GeniallyId";
import GeniallyRepository from "../domain/GeniallyRepository";

interface GeniallyDocument {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt?: Date;
}

export default class MongoGeniallyRepository implements GeniallyRepository {

  private collection = "genially";

  async save(genially: Genially): Promise<void> {
    const id = genially.id.value;
    const db = await new MongoDbClient().getDb();
    const document = { ...genially.toPrimitives(), _id: id };
    await db.collection(this.collection).updateOne({ _id: id }, { $set: document }, { upsert: true });
  }

  async update(genially: Genially): Promise<void> {
    genially.update();
    await this.save(genially);
  }

  async find(id: GeniallyId): Promise<Genially> {
    const db = await new MongoDbClient().getDb();
    const filter: Filter<GeniallyDocument> = { _id: id.value };
    const document = await db.collection(this.collection).findOne<GeniallyDocument>(filter);

    return document ? Genially.fromPrimitives({
      id: id.value,
      name: document.name,
      description: document.description,
      createdAt: document.createdAt,
      modifiedAt: document.modifiedAt,
      deletedAt: document.deletedAt
    }) : null;
  }

  async delete(id: GeniallyId): Promise<void> {
    const genially = await this.find(id);
    genially.delete();
    await this.save(genially);
  }
}
