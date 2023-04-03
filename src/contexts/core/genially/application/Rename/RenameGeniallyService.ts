import Genially from "../../domain/Genially";
import GeniallyId from "../../domain/GeniallyId";
import GeniallyName from "../../domain/GeniallyName";
import GeniallyRepository from "../../domain/GeniallyRepository";

type RenameGeniallyServiceRequest = {
  id: string;
  newName: string;
};

export default class RenameGeniallyService {
  constructor(private readonly repository: GeniallyRepository) {}
  
  public async execute(req: RenameGeniallyServiceRequest): Promise<Genially> {
    const genially = await this.repository.find(new GeniallyId(req.id));

    const renamedGenially = new Genially(genially.id, new GeniallyName(req.newName), genially.description, genially.createdAt);

    await this.repository.update(renamedGenially);

    return renamedGenially;
  }
}
