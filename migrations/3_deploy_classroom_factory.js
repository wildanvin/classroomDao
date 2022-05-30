var ClassroomFactory = artifacts.require('./ClassroomFactory.sol')

module.exports = async function (deployer) {
  await deployer.deploy(ClassroomFactory)
}
