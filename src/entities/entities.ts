import {
  Address,
  BigInt,
  Bytes,
  Entity,
  store,
  Value,
  ValueKind,
} from "@graphprotocol/graph-ts";

export class WritingEditionClone extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WritingEditionClone entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type WritingEditionClone must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WritingEditionClone", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): WritingEditionClone | null {
    return changetype<WritingEditionClone | null>(
      store.get("WritingEditionClone", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get owner(): Address {
    let value = this.get("owner");
    return value!.toAddress();
  }

  set owner(value: Address) {
    this.set("owner", Value.fromAddress(value));
  }

  get clone(): Address {
    let value = this.get("clone");
    return value!.toAddress();
  }

  set clone(value: Address) {
    this.set("clone", Value.fromAddress(value));
  }
}

export class WritingEditionToken extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CloneDeployed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type CloneDeployed must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WritingEditionToken", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): WritingEditionToken | null {
    return changetype<WritingEditionToken | null>(
      store.get("WritingEditionToken", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get owner(): Address {
    let value = this.get("owner");
    return value!.toAddress();
  }

  set owner(value: Address) {
    this.set("owner", Value.fromAddress(value));
  }

  get clone(): Address {
    let value = this.get("clone");
    return value!.toAddress();
  }

  set clone(value: Address) {
    this.set("clone", Value.fromAddress(value));
  }
}
