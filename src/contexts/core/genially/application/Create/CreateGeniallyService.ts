import { EventBus } from "../../../../shared/domain/Events/EventBus";
import Genially from "../../domain/Genially";
import GeniallyDescription from "../../domain/GeniallyDescription";
import GeniallyId from "../../domain/GeniallyId";
import GeniallyName from "../../domain/GeniallyName";
import GeniallyRepository from "../../domain/GeniallyRepository";
import { CreateGeniallyServiceRequest } from "./CreateGeniallyServiceRequest";
import { CreateGeniallyServiceResponse } from "./CreateGeniallyServiceResponse";

export default class CreateGeniallyService {
  constructor(private readonly repository: GeniallyRepository, private readonly eventBus: EventBus) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<CreateGeniallyServiceResponse> {
    const genially = Genially.create(new GeniallyId(req.id), new GeniallyName(req.name), new GeniallyDescription(req.description));

    await this.repository.save(genially);

    await this.eventBus.publish(genially.pullDomainEvents());

    return genially.toPrimitives();
  }
}
