// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Validators implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public field4?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Validators entity without an ID");
        await store.set('Validators', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Validators entity without an ID");
        await store.remove('Validators', id.toString());
    }

    static async get(id:string): Promise<Validators | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Validators entity without an ID");
        const record = await store.get('Validators', id.toString());
        if (record){
            return Validators.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Validators(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
