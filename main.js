const SHA256 =require('crypto-js/sha256')
class Blcok{
    constructor(index,timestamp,data,previousHash=''){
        this.index =index;
        this.timestamp =timestamp;
        this.data =data;
        this.previousHash =previousHash;
        this.hash =this.calculateHash();
    }

    calculateHash=()=>{
        return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
    }
    createGenesisBlock=()=>{
        return new Blcok(0,"19/05/2021","Genesis Block","0");
    }
    getLastBlock=()=>{
        return this.chain[this.chain.length-1];
    }
    addBlock=(newBlock)=>{
        newBlock.previousHash =this.getLastBlock().hash;
        newBlock.hash =newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid=()=>{
        for (let i = 1;i < this.chain.length; i++) {
            const currentBlock =this.chain[i];
            const previousBlock =this.chain[i - 1];
            if(currentBlock.hash != currentBlock.calculateHash()) return false;
            console.log(JSON.stringify(previousBlock))
            //if(currentBlock.previousHash != previousBlock.hash) return false;
        }
        return true;
    }

}
let urbanoCoin = new BlockChain();
urbanoCoin.addBlock(new Blcok(1,"19/05/2021",{price:2.6}));
urbanoCoin.addBlock(new Blcok(2,"19/06/2021",{price:13500}));

console.log(JSON.stringify(urbanoCoin,null,4));
console.log(`Is Block valid? ${urbanoCoin.isChainValid()}`)

urbanoCoin.chain[1].data = 300;

console.log(`Is Block valid? ${urbanoCoin.isChainValid()}`)