import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class RenameGeniallyService {
  constructor(private repository: GeniallyRepository) {}
  
  public async execute(id: string, newName: string): Promise<Genially> {
    const genially = await this.repository.find(id);

    const renamedGenially = new Genially(genially.id, newName, genially.description);

    await this.repository.save(renamedGenially);

    return renamedGenially;
  }
}
