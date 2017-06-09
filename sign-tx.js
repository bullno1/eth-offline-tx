function sign_tx(tx) {
	console.log(JSON.stringify(tx, null, 2));
	personal.unlockAccount(tx.from);
	return eth.signTransaction(tx).raw;
}
