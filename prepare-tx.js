onClick("btn_recommend", withWeb3(function(web3) {
	var from_address = getValue("from_address");
	if(from_address) {
		web3.eth.getTransactionCount(from_address, setValueFn("nonce"));
	}

	var to_address = getValue("to_address");
	if(to_address) {
		web3.eth.estimateGas({
			to: to_address,
			value: web3.toWei(getValue("amount"), "ether"),
			data: getValue("data")
		}, setValueFn("gas"));
	}

	web3.eth.getGasPrice(setValueFn("gas_price"));
}));

onClick("btn_prepare", withWeb3(function(web3) {
	var tx = {
		from: getValue("from_address"),
		to: getValue("to_address"),
		value: web3.toWei(getValue("amount"), "ether"),
		data: getValue("data") || "0x",
		chainId: getValue("net_id"),
		nonce: getValue("nonce"),
		gas: getValue("gas"),
		gasPrice: getValue("gas_price")
	};

	var el = document.getElementById("unsigned_tx");
	el.value = btoa(JSON.stringify(tx));
	el.focus();
	el.select();
	document.execCommand("copy");
}));

onClick("btn_send", withWeb3(function(web3) {
	var resultWindow = window.open();
	web3.eth.sendRawTransaction(getValue("signed_tx"), function(error, txHash) {
		if(error) {
			resultWindow.document.write(error);
		} else {
			resultWindow.location = "https://etherscan.io/tx/" + txHash;
		}
	});
}));

function getValue(id) {
	return document.getElementById(id).value;
}

function onClick(id, func) {
	document.getElementById(id).addEventListener("click", func);
}

var web3 = null;
function withWeb3(func) {
	return function() {
		var args = Array.prototype.slice.call(arguments);
		if(web3) {
			args.unshift(web3);
			return func.apply(this, args);
		}

		var rpc_url = prompt("Please enter an RPC URL");
		if(rpc_url) {
			web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));
			args.unshift(web3);
			return func.apply(this, args);
		}
	}
}

function setValueFn(id) {
	return function(error, value) {
		if(error) {
			alert(error);
		} else {
			document.getElementById(id).value = value;
		}
	}
}
