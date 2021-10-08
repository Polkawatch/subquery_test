// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Exposure implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public total?: string;

    public own?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Exposure entity without an ID");
        await store.set('Exposure', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Exposure entity without an ID");
        await store.remove('Exposure', id.toString());
    }

    static async get(id:string): Promise<Exposure | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Exposure entity without an ID");
        const record = await store.get('Exposure', id.toString());
        if (record){
            return Exposure.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Exposure(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
