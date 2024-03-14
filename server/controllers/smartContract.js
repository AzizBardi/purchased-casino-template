const {Web3} = require('web3');
require('dotenv').config()
console.log(process.env.BLOCKCHAIN_NODE_ENDPOINT)
const web3 = new Web3(process.env.BLOCKCHAIN_NODE_ENDPOINT);
const contractABI = require('../config/abi/contractABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(contractABI, contractAddress);
const BN = web3.utils.BN;


exports.getContractData = async (req, res, method) => {
  try {
    let data = await contract.methods[method]().call();
    data = typeof data === 'bigint'? data.toString() : data;
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getContractDataAll = async (req, res) => {
    const contractFunctions = contractABI
  .filter(item => item.type === 'function') 
  .map(func => func.name);
let result = {} 
for (func of contractFunctions ){
    try {
    let data = await contract.methods[func]().call();
    data = typeof data === 'bigint' ? data.toString() : data;
    result[func]=data
} catch (error) {
    result[func]="not read-only function"
}
}
    res.json(result);

};
