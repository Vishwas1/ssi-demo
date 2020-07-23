import IDIDResolver from './IDIDRevolver'
import IDID from './DID';
import IDIDDoc from './IDIDDoc';
import VerificationRelationShips from './VerificationRelationShips';

export default class DIDResolver{

    constructor(){}
    // resolve(did: IDID): IDIDDoc{
    //     // TODO:
    //     // figure out the DIDdoc wrt this did using op_read() of DID Method
    //     return null //new DIDDoc(did, did, new VerificationRelationShips(""))
    // } 

    // didURL: did:example:1234#keys-1
    dereferenceDIDURl(didURl: string){
    
        // TODO:
        // parse didURL
        //  - Get did
        //  - Get params
        // resolve DID and get diddoc
        // retrive requested params from the diddoc
    }
}