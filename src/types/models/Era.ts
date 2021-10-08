// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Era implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public validatorSetId: string;

    public startBlock: number;

    public timestamp: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Era entity without an ID");
        await store.set('Era', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Era entity without an ID");
        await store.remove('Era', id.toString());
    }

    static async get(id:string): Promise<Era | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Era entity without an ID");
        const record = await store.get('Era', id.toString());
        if (record){
            return Era.create(record);
        }else{
            return;
        }
    }


    static async getByValidatorSetId(validatorSetId: string): Promise<Era[] | undefined>{
      
      const records = await store.getByField('Era', 'validatorSetId', validatorSetId);
      return records.map(record => Era.create(record));
      
    }


    static create(record){
        let entity = new Era(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
