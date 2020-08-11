const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {}
for(let i = 0 ; i < 10; i++) {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic().encode('hex');
  console.log(publicKey + " with a private key of " + key.getPrivate().toString(16) + " has a balance of 100");
  balances[publicKey] = 100;
}

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {signature, transaction, publicKey} = req.body;
  const key = ec.keyFromPublic(publicKey, 'hex');
  const hash = SHA256(JSON.stringify(transaction)).toString();
  if(key.verify(hash, signature)) {
    console.log(req.body);
    balances[publicKey] -= transaction.amount;
    balances[transaction.recipient] = (balances[transaction.recipient] || 0) + +transaction.amount;
    res.send({ balance: balances[publicKey] });
  }
  else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
