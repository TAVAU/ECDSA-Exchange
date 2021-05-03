const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');

const ec = new EC('secp256k1');

// TODO: fill in the public key points
const publicKey = {
  x: "891e768e4886594d3e8ec41d91f972599d8d37a7814cd23c5be9e1b2ad1e3a0f",
  y: "16e1ea3979a8faecf0b0a76b32422e75776fcd1ca43e275b1e1403d480bb7751"
}

const key = ec.keyFromPublic(publicKey, 'hex');

// TODO: change this message to whatever was signed
const msg = "I am in the ChainShot Bootcamp";
const msgHash = SHA256(msg).toString();

// TODO: fill in the signature components
const signature = {
  r: "36683c8a19b2e69a152c8e81154221c35613bf7d05dce865c5f3112e4c3d47eb",
  s: "5e1109366536b8886cfed7c8b4169fd138e331ae472528e9dff1913ed5187159"
};

console.log(key.verify(msgHash, signature));
