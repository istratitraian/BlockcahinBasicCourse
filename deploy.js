const HDWalletPorvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
  interface,
  bytecode
} = require('./compile');


//my Chrome mnemonic
const provider = new HDWalletPorvider(
  'MNEMONIC here',
  'https://rinkeby.infura.io/eIwwjgj5xmZFQyh0450I'
);


const ARG_MESSAGE = "Inbox_arg0_deploy";
const GAS = '1000000';
let accounts;
let inbox;

const web3 = new Web3(provider);

const deploy = async () => {
  accounts = await web3.eth.getAccounts(); //wait for all acounts
  console.log(' --- Connected to account[0] = ', accounts[0]);

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [ARG_MESSAGE]
    })
    .send({
      from: accounts[0],
      gas: GAS
    });

  console.log(' <<< Contract deployed to address = ', inbox.options.address);

};
deploy();
