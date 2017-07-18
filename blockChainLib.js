function (context, args) {
  /*
    BlockChainLib Version 0.1.0

    Credits:
      Thanks to "ast" (@Ast#9365 on Discord) for providing the SHA256 implementation used in this library. (Can be found in #s.kvothe_the_arcane.cryptolib() )
  */

  /*
    ===================================
     Misc. blockChainLib Documentation
    ===================================

    blockChain: blockChain is a required argument of the type "array" that acts as the "blockchain" that the Block is created in reference to. blockChain should
      always be the blockchain that you intend to add the Block to. The effects of passing blockChain as anything else are not documented, and will likely result
      in errors, or otherwise unpredictable behavior.
   */
  var cryptoLib = #s.kvothe_the_arcane.cryptolib()

  /**
   * GerericBlock: The generic Block type that all others inherit from in some way.
   * @param  {array}  blockChain See documentation at the top of this file.
   * @param  {object} data       The property "data" is set to this value. This is the property that usually changes between block types.
   * @constructor
   */
  var GenericBlock = function (blockChain, data) {
    let genericBlock = {
      index: blockChain.length,
      timestamp: Date.now(),
      data: data
    }
    if (blockChain[blockChain.length-1] !== undefined) {
      genericBlock.lastHash = blockChain[blockChain.length-1].hash;
    } else {
      genericBlock.lastHash = "";
    }
    genericBlock.hash = cryptoLib.sha256(`${genericBlock.index}${genericBlock.timestamp}${genericBlock.data}${genericBlock.lastHash}`);

    return genericBlock;
  }

  /**
   * GenesisBlock: Special block placed at the beginning of a blockChain. not strictly required, but heavily recommended.
   * @param  {array}  blockChain See documentation at the top of this file.
   * @constructor
   */
  var GenesisBlock = function (blockChain) {
    let genesisBlock = GenericBlock(blockChain, {
      type: "Genesis",
      message: "In the beginning God created the heaven and the earth. - Genesis 1:1 KJV"
    });
    return genesisBlock;
  }

  var DemoBlock = function (blockChain, message) { //Here we are defining a new block, called DemoBlock. The first argument, "blockChain", is always required, and it's purpose is defined at the top of this file. The second argument, "message" in this case, is info used to construct the "data" portion of the Block.
    let demoBlock = GenericBlock(blockChain, { //Here we are calling this Block's direct parent (in this case, GenericBlock), passing "blockChain" through, and setting the block's "data" property.
      type: "DemoBlock", //This is important for usability purposes. This should always be the name of your block type (in this case, "DemoBlock"). It should be noted that this property is technically optional, as there is nothing that depends on it in this library.
      message: message //Here we are providing the special functionality of this block: holding a message. This is not a terribly complex piece of functionality, but it's good for demonstration.
    });
    return demoBlock; //Very important. This returns the completed block.
  }

  return {
    GenericBlock: GenericBlock,
    GenesisBlock: GenesisBlock,
    DemoBlock:    DemoBlock
  }
}
