pragma solidity ^0.4.21;

contract Inbox{

     string public message;

    function Inbox(string m) public{
       message = m;
    }


    function setMessage(string m) public{
        message = m;
    }


    /* function getMessage() public view returns(string){
        return message;
    } */

    //https://github.com/istratitraian/Blockcahin.git

}
