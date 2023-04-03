import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  constructor(private readonly repository: GeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const genially = Genially.create(req.id, req.name, req.description);

    await this.repository.save(genially);

    return genially;
  }
}
