var Classroom = artifacts.require('./Classroom.sol')

module.exports = function (deployer) {
  deployer.deploy(Classroom, '0x4b2b0D5eE2857fF41B40e3820cDfAc8A9cA60d9f', 3)
}
