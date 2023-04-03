import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class DeleteGeniallyService {
  constructor(private readonly repository: GeniallyRepository) {}

  public async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
