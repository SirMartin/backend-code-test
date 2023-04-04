import { DateValueObject } from "../../../shared/ValueObjects/DateValueObject";
import GeniallyCreatedAt from "./GeniallyCreatedAt";
import GeniallyDeletedAt from "./GeniallyDeletedAt";
import GeniallyDescription from "./GeniallyDescription";
import GeniallyId from "./GeniallyId";
import GeniallyName from "./GeniallyName";
import GeniallyModifiedAt from "./GeniallyUpdatedAt";

export default class Genially {
  private _id: GeniallyId;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: GeniallyCreatedAt;
  private _modifiedAt: GeniallyModifiedAt;
  private _deletedAt: GeniallyDeletedAt;

  constructor(id: GeniallyId, name: GeniallyName, description?: GeniallyDescription, createdAt?: GeniallyCreatedAt, modifiedAt?: GeniallyModifiedAt, deletedAt?: GeniallyDeletedAt) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._deletedAt = deletedAt;
  }

  static create(id: GeniallyId, name: GeniallyName, description?: GeniallyDescription) {
    return new this(id, name, description, new GeniallyCreatedAt(new Date()));
  }

  static fromPrimitives(data: { id: string, name: string, description: string, createdAt: Date, modifiedAt: Date, deletedAt: Date }): Genially {
    return new Genially(
      new GeniallyId(data.id), 
      new GeniallyName(data.name), 
      data.description !== null ? new GeniallyDescription(data.description) : undefined,
      new GeniallyCreatedAt(data.createdAt),
      data.modifiedAt !== null ? new GeniallyModifiedAt(data.modifiedAt) : undefined,
      data.deletedAt !== null ? new GeniallyDeletedAt(data.deletedAt) : undefined);
  }

  toPrimitives() {
    return {
      id: this._id.value,
      name: this._name.value,
      description: this._description?.value,
      createdAt: this._createdAt?.value,
      modifiedAt: this._modifiedAt?.value,
      deletedAt: this._deletedAt?.value
    };
  }

  get id(): GeniallyId {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): GeniallyCreatedAt {
    return this._createdAt;
  }

  get modifiedAt(): GeniallyModifiedAt {
    return this._modifiedAt;
  }

  get deletedAt(): GeniallyDeletedAt {
    return this._deletedAt;
  }

  update(): void {
    this._modifiedAt = new GeniallyModifiedAt(new Date());
  }

  delete(): void {
    this._deletedAt = new GeniallyDeletedAt(new Date());
  }

  isDeleted(): boolean {
    return this._deletedAt !== undefined;
  }
}
