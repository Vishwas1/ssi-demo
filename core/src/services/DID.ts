import IDID from './IDID'
import { v4 as uuid4 } from 'uuid';
import { did } from '../config';

export default class DID implements IDID{
    method: string;
    prefix: string;
    constructor(didM: string){
        this.method = didM;
        this.prefix = did.prefix;
    }

    private getUniqueIdentifier(){
        //TODO: This needs to be replaced with better cryptographic function. It MUST be unique
        return uuid4();
    }

    did(): string{
        return `${this.prefix}:${this.method}:${this.getUniqueIdentifier()}`;
    }
}

