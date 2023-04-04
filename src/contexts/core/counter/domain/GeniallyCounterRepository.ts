import { GeniallyCounter } from "./GeniallyCounter";

export interface GeniallyCounterRepository {
    save(geniallyCounter: GeniallyCounter): Promise<void>;

    get(): Promise<GeniallyCounter>;
}