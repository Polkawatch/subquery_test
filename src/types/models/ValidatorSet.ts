// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class ValidatorSet implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public eraId: string;

    public totalValidators?: number;

    public validatorList?: string[];


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ValidatorSet entity without an ID");
        await store.set('ValidatorSet', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ValidatorSet entity without an ID");
        await store.remove('ValidatorSet', id.toString());
    }

    static async get(id:string): Promise<ValidatorSet | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ValidatorSet entity without an ID");
        const record = await store.get('ValidatorSet', id.toString());
        if (record){
            return ValidatorSet.create(record);
        }else{
            return;
        }
    }


    static async getByEraId(eraId: string): Promise<ValidatorSet[] | undefined>{
      
      const records = await store.getByField('ValidatorSet', 'eraId', eraId);
      return records.map(record => ValidatorSet.create(record));
      
    }


    static create(record){
        let entity = new ValidatorSet(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
