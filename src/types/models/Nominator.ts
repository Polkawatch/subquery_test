// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Nominator implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public exposureId: string;

    public value?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Nominator entity without an ID");
        await store.set('Nominator', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Nominator entity without an ID");
        await store.remove('Nominator', id.toString());
    }

    static async get(id:string): Promise<Nominator | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Nominator entity without an ID");
        const record = await store.get('Nominator', id.toString());
        if (record){
            return Nominator.create(record);
        }else{
            return;
        }
    }


    static async getByExposureId(exposureId: string): Promise<Nominator[] | undefined>{
      
      const records = await store.getByField('Nominator', 'exposureId', exposureId);
      return records.map(record => Nominator.create(record));
      
    }


    static create(record){
        let entity = new Nominator(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
