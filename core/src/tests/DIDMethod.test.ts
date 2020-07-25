import DIDMethod from '../services/DIDMethod';
import * as config from '../config';
const didConfig = config.did;
import { expect } from 'chai';

describe('DID Method', () => {
    let didMInstance: DIDMethod;
    beforeEach(() => {
        didMInstance = new DIDMethod("");
    })

    it('should have method name set as per config', ()=>{
        expect(didMInstance.methodName).to.equal(didConfig.method);
    })

    it('should create did and didDoc', ()=>{
        const { did, didDoc } = didMInstance.op_create();
        console.log(did)
        console.log(didDoc)
        expect(did).to.includes(didConfig.sheme)
    })

    it('should create did as per did syntax', ()=>{

    })
})
