# eth-offline-tx

[![License](https://img.shields.io/badge/license-BSD-blue.svg)](LICENSE) 

*eth-offline-tx* is a simple offline transaction signing tool for Ethereum using only [web3.js](https://github.com/ethereum/web3.js/) and no other dependencies.

## Usage

0. (Optional) If you do not want to run your own ETH node, get an RPC URL from [INFURA](https://infura.io/).
1. Open prepare-tx.html in one internet-accessible computer.
2. Fill in the relevant details, "data" can be left blank.
3. "Network parameters" session can be auto-filled by pressing "Recommend".
4. Click "Prepare", a long string will be copied to your clipboard, you can also copy it manually.
5. Transfer that string to an airgapped computer.
6. On the airgapped wallet, run `./sign-tx <transaction string>`.
   Note: `sign-tx` and `sign-tx.js` must be in the same directory as the `geth` executable if `geth` is not in `PATH`.
7. Verify the transaction details and enter the passphrase to sign it.
8. Transfer the signed transaction string back to the online computer and paste it into "Signed transaction".
9. Click "Send".
