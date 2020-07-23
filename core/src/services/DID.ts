import IDID from './IDID'
import DIDMethod from './DIDMethod';
import { v4 as uuid4 } from 'uuid';

export default class DID implements IDID{
    method: DIDMethod;
    prefix: string;
    constructor(didM: DIDMethod){
        this.method = didM;
        this.prefix = "did";
    }

    private getUniqueIdentifier(){
        //TODO: This needs to be replaced with better cryptographic function. It MUST be unique
        return uuid4();
    }

    did(): string{
        return `${this.prefix}:${this.method.methodName}:${this.getUniqueIdentifier()}`;
    }
}

