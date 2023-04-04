import { GeniallyCounterRepository } from "../domain/GeniallyCounterRepository";

export class GeniallyIncreaseCounterService {
    constructor(private readonly repository: GeniallyCounterRepository){}

    public async execute() {
        const actualCounter = await this.repository.get();

        actualCounter.increase();

        await this.repository.save(actualCounter);
    }
}