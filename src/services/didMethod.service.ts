import IDID from '../models/IDID';
import { DBService, SchemaType } from './db.service';
import { host, port,hypersignSDK } from '../config'

export default class DIDMethod implements IDID{
    did: string;
    didDoc: string;
    name: string;
    dbSerice: DBService;
    id: string;
    prefix: string
    constructor(name : string = ""){
        // TODO: check if this name is alreay present in db otherwise throw error
        this.name = name;
        this.did = "";
        this.id = "";
        this.didDoc = "";
        this.prefix = "did_";
        this.dbSerice = new DBService();
    }

    private getId(){
        const uuid = this.prefix + hypersignSDK.did.getChallange()
        return uuid.substring(0, 20)
    }

    create = async () => {
        const { keys, didDoc, did } = await hypersignSDK.did.getDidDocAndKeys({ name:  this.name})
        didDoc['@context'].push(`http://${host}:${port}/api/did/resolve`)
         
        this.did = did;
        this.id = this.did//this.getId();
        this.didDoc = JSON.stringify(didDoc);

        // TODO: store credentials in db
        await this.dbSerice.add(SchemaType.Did, this);
        return {
            keys,
            did: this.did,
            didDoc: didDoc
        }
    }

    resolve = async (did: string) => {
        // TODO: fetch didDoc from db 
        let didInDb:IDID  = await this.dbSerice.getOne(SchemaType.Did, { did});
        console.log(didInDb)
        return JSON.parse(didInDb.didDoc)
    }

    list = async () => {
        return await this.dbSerice.getAll(SchemaType.Did, {});
    }
}



