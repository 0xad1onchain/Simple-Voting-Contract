import Web3 from "web3";

window.ethereum.request({ method: 'eth_requestAccounts' });
const web3 = new Web3(window.ethereum);

const checkBalance = async () => {
    const acc = await web3.eth.getAccounts();
    console.log(acc);
    const bal = await web3.eth.getBalance(acc[0]);
    console.log(bal);
};

checkBalance();

export default web3;