import Genially from "../domain/Genially";
import GeniallyId from "../domain/GeniallyId";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[];

  public constructor() {
    this.geniallys = [];
  }

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async update(genially: Genially): Promise<void> {
    genially?.update();
    await this.save(genially);
  }

  async find(id: GeniallyId): Promise<Genially> {
    return this.geniallys.find(
      (genially) => genially.id.value === id.value && !genially.isDeleted());
  }

  async delete(id: GeniallyId): Promise<void> {
    const geniallyToDelete = await this.find(id);
    geniallyToDelete?.delete();
  }
}
