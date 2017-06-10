function sign_tx(tx) {
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	console.log("ATTENTION! Please verify the transaction before signing:");
	console.log(JSON.stringify(tx, null, 2));
	console.log("Value in ETH: " + web3.fromWei(tx.value, 'ether'));
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	personal.unlockAccount(tx.from);
	return eth.signTransaction(tx).raw;
}
