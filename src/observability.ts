import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  CloneDeployed as CloneDeployedEvent,
  FundingRecipientSet as FundingRecipientSetEvent,
  Transfer as TransferEvent,
  WritingEditionPurchased as WritingEditionPurchasedEvent,
} from "../generated/Observability/Observability";
import {
  FundingRecipientSet,
  Transfer,
  WritingEditionPurchased,
} from "../generated/schema";
import { WritingEditionClone, WritingEditionToken } from "./entities/entities";

export function zeroBI(): BigInt {
  return BigInt.fromI32(0);
}

export function zeroAddress(): Address {
  return Address.fromBytes(
    Bytes.fromHexString("0x0000000000000000000000000000000000000000")
  );
}

export function getOrInitWritingEditionToken(
  address: Address
): WritingEditionToken {
  let id = Bytes.fromHexString(address.toHexString());
  let writingEditionToken = WritingEditionToken.load(id);
  if (!writingEditionToken) {
    writingEditionToken = new WritingEditionToken(id);
    writingEditionToken.owner = zeroAddress();
    writingEditionToken.clone = zeroAddress();
    writingEditionToken.tokenId = zeroBI();
    writingEditionToken.save();
  }
  return writingEditionToken as WritingEditionToken;
}

export function handleCloneDeployed(event: CloneDeployedEvent): void {
  let writingEditionPurchased = new WritingEditionClone(
    Bytes.fromHexString(event.params.clone.toHexString())
  );
  writingEditionPurchased.clone = event.params.clone;
  writingEditionPurchased.owner = event.params.owner;
  writingEditionPurchased.save();
}

export function handleFundingRecipientSet(
  event: FundingRecipientSetEvent
): void {
  let entity = new FundingRecipientSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.clone = event.params.clone;
  entity.oldFundingRecipient = event.params.oldFundingRecipient;
  entity.newFundingRecipient = event.params.newFundingRecipient;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.clone = event.params.clone;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let writingEditionToken = getOrInitWritingEditionToken(event.params.clone);
  writingEditionToken.clone = event.params.clone;
  writingEditionToken.owner = event.params.to;
  writingEditionToken.tokenId = event.params.tokenId;
  writingEditionToken.save();
}
