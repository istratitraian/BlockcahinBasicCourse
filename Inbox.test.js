const assert = require('assert');
const ganache = require('ganache-cli');// Local test network
const Web3 = require('web3');// portal to Etherium World
const provider = ganache.provider();
const web3 = new Web3(provider); // private, public keys
const {
  interface,
  bytecode
} = require('../compile');


const INIT_PARAM_MESSAGE = "Inbox_arg0_TEST";
const GAS = '1000000';
let accounts;
let inbox;

beforeEach(async () => {
  //before each "it('test Name', () => {})"
  //Get list of all accounts
  // web3.eth.getAccounts().then(fetchAccounts => {
  //   console.log(fetchAccounts);
  // });

  accounts = await web3.eth.getAccounts(); //wait for all acounts
  console.log(accounts[0]);

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INIT_PARAM_MESSAGE]
    })
    .send({
      from: accounts[0],
      gas: GAS
    });


});

describe('DescribeInboxTEST', () => {

  // it('test 1', () => {
  //   // assert.equal(car.park(), 'stopped');
  //   console.log(inbox);
  // });

  // it('test 2 deploy a contract Inbox', () => {
  //   assert.ok(inbox.options.address);
  // });

  it('test 3: call message() ', async () => {
    console.log('-------------------------------------------');

    const message = await inbox.methods.message().call();
    console.log("---- await inbox.methods.message().call() == " + message);
    assert.equal(message, INIT_PARAM_MESSAGE);
  });

  it('test 4: send setMessage() ', async () => {
      await inbox.methods.setMessage('New Message @@@').send({
      from: accounts[0]
    });
    console.log('-------------------------------------------');
    const message = await inbox.methods.message().call();
    console.log("---- await inbox.methods.setMessage; await inbox.methods.message().call() : message = " + message);
    // assert.equal(message, INIT_PARAM_MESSAGE);
  });

});
