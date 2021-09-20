import {SubstrateEvent, SubstrateExtrinsic} from "@subql/types";
import {Validators} from "../types";
import {Balance} from "@polkadot/types/interfaces";


// export async function handleTransfer(event: SubstrateEvent): Promise<void> {
//     const from = event.event.data[0]
//     const to = event.event.data[1]
//     const amount = event.event.data[2]

//     const transfer = new Transfer(
//         `${event.block.block.header.number.toNumber()}-${event.idx}`
//     )
//     transfer.blockNumber = event.block.block.header.number.toBigInt()
//     transfer.from = from.toString()
//     transfer.to = to.toString()
//     transfer.amount = (amount as Balance).toBigInt()
//     await transfer.save()
// }

// export async function handleValidators(event: SubstrateEvent): Promise<void> {
//     const from = event.event.data[0]
//     const to = event.event.data[1]
//     const amount = event.event.data[2]

//     const transfer = new Transfer(
//         `${event.block.block.header.number.toNumber()}-${event.idx}`
//     )
//     transfer.blockNumber = event.block.block.header.number.toBigInt()
//     transfer.from = from.toString()
//     transfer.to = to.toString()
//     transfer.amount = (amount as Balance).toBigInt()
//     await transfer.save()
// }


export async function handleValidators(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new Validators(
        `${extrinsic.block.block.header.hash.toString()}`
    )
    record.field4 = extrinsic.block.timestamp;
    // const record = await Validators.get(extrinsic.block.block.header.hash.toString());
    //Date type timestamp
    // record.validators = extrinsic.extrinsic.call.session.validators;
    //Boolean tyep
    // record.field5 = true;
    await record.save();
}




