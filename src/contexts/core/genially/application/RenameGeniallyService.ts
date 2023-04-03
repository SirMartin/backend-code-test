import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

type RenameGeniallyServiceRequest = {
  id: string;
  newName: string;
};

export default class RenameGeniallyService {
  constructor(private readonly repository: GeniallyRepository) {}
  
  public async execute(req: RenameGeniallyServiceRequest): Promise<Genially> {
    const genially = await this.repository.find(req.id);

    const renamedGenially = new Genially(genially.id, req.newName, genially.description, genially.createdAt);

    await this.repository.save(renamedGenially);

    return renamedGenially;
  }
}
