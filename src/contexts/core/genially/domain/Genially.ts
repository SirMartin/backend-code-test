import { DateValueObject } from "../../../shared/DateValueObject";
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

  constructor(id: GeniallyId, name: GeniallyName, description?: GeniallyDescription, createdAt?: DateValueObject) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
  }

  static create(id: GeniallyId, name: GeniallyName, description?: GeniallyDescription)
  {
    return new this(id, name, description, new GeniallyCreatedAt(new Date()));
  }

  toPrimitives() {
    return {
      id: this._id.value,
      name: this._name.value,
      description: this._description.value
    }
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
