import Hello from '../hello';
import { expect } from 'chai';
import { doesNotMatch } from 'assert';


describe('Hello Class', () => {
    let helloInst: Hello;
    beforeEach(()=>{
        helloInst =  new Hello();
    })
    it('should return hello world', () => {
        const res = helloInst.hello();
        expect(res).to.equal('Hello World!');
    })
})
