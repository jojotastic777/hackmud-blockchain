function (context, args) {
  //This is an add-on module for my block chain library, adding a generic "proof-of-work" block, with adjustable difficulty.
  //Be careful with the difficulty, however as setting it too high will, as of this initial release, render the block unsolvable
  //in the amount of time hackmud allows. I will likely implement db-based solving over multiple runs of the script.
  var bcl =    #s.kvothe_the_arcane.blockchainlib()
  var cryptoLib = #s.kvothe_the_arcane.cryptolib()

  function GenericProvenBlock (blockChain, difficulty, data) {
    let genericProvenBlock = {
      index: blockChain.length,
      timestamp: Date.now(),
      data: data,
      nonce: Math.floor(Math.random()*(Math.pow(10,difficulty)))
    }
    if (blockChain[blockChain.length-1] !== undefined) {
      genericProvenBlock.lastHash = blockChain[blockChain.length-1].hash;
    } else {
      genericProvenBlock.lastHash = "";
    }
    genericProvenBlock.hash = cryptoLib.sha256(`${genericProvenBlock.index}${genericProvenBlock.timestamp}${genericProvenBlock.data}${genericProvenBlock.lastHash}${genericProvenBlock.nonce}`);
    while (genericProvenBlock.hash.slice(0,4) != "0000") {
      genericProvenBlock.nonce++;
      genericProvenBlock.hash = cryptoLib.sha256(`${genericProvenBlock.index}${genericProvenBlock.timestamp}${genericProvenBlock.data}${genericProvenBlock.lastHash}${genericProvenBlock.nonce}`);
      //#D(genericProvenBlock.hash)
      //break
    }
    return genericProvenBlock;
  }

  /*return {
    GenericProvenBlock:GenericProvenBLock
  }*/

  function test_GenericProvenBlock () {
    let blockchain = []
    blockchain.push(bcl.GenesisBlock(blockchain))
    blockchain.push(GenericProvenBlock(blockchain, 5, {message:"This is a generic proven block for testing purposes."}));
    return blockchain;
  }

  return test_GenericProvenBlock()
}
