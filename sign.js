const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');

const ec = new EC('secp256k1');

// TODO: fill in your hex private key
const privateKey = "9f39ca3bebb38e5779808561704fce4054632ee90ee455295f15f6fa01ef6d68";

const key = ec.keyFromPrivate(privateKey);

// TODO: change this message to whatever you would like to sign
const message = "I am Yuhan";

const msgHash = SHA256(message);
//console.log(typeof msgHash)// obj
console.log(msgHash)
const signature = key.sign(msgHash.toString());
console.log(signature)
console.log(typeof signature)
console.log({
  message,
  signature: {
    r: signature.r.toString(16),
    s: signature.s.toString(16)
  }
});
