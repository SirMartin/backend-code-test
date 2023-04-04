import { AggregateRoot } from "../../../../contexts/shared/domain/AggregateRoot";
import GeniallyCounterModifiedAt from "./GeniallyCounterModifiedAt";
import GeniallyCounterTotal from "./GeniallyCounterTotal";

type GeniallyCounterPrimitives = {
    total: number,
    modifiedAt: Date
  }

export class GeniallyCounter extends AggregateRoot{
    private _total: GeniallyCounterTotal;
    private _modifiedAt: GeniallyCounterModifiedAt;

    public constructor(total: GeniallyCounterTotal, modifiedAt: GeniallyCounterModifiedAt){
        super();
        this._total = total;
        this._modifiedAt = modifiedAt;
    }

    static fromPrimitives(data: { total: number, modifiedAt: Date }): GeniallyCounter {
        return new GeniallyCounter(
          new GeniallyCounterTotal(data.total), 
          new GeniallyCounterModifiedAt(data.modifiedAt));
      }

      toPrimitives(): GeniallyCounterPrimitives {
        return {
          total: this._total.value,
          modifiedAt: this._modifiedAt?.value
        };
      }

    public get total(): number {
        return this._total.value;
    }

    public get modifiedAt(): Date {
        return this._modifiedAt.value;
    }

    public increase(): void {
        this._modifiedAt = new GeniallyCounterModifiedAt(new Date());
        this._total = new GeniallyCounterTotal(this._total.value + 1)
    }

}