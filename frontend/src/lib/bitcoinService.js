'use strict';

const bitcoin = require('bitcoinjs-lib');

class BitcoinService {
    constructor() {
        this.network = bitcoin.networks.bitcoin; // Use the Bitcoin mainnet
    }

    generateKeyPair() {
        const keyPair = bitcoin.ECPair.makeRandom({ network: this.network });
        return {
            publicKey: keyPair.publicKey.toString('hex'),
            privateKey: keyPair.toWIF()
        };
    }

    createTransaction(fromAddress, toAddress, amount, privateKey) {
        const keyPair = bitcoin.ECPair.fromWIF(privateKey, this.network);
        const psbt = new bitcoin.Psbt({ network: this.network });

        // This is a placeholder; you will need to provide the actual UTXOs
        const utxos = [];
        utxos.forEach(utxo => {
            psbt.addInput({
                hash: utxo.txId,
                index: utxo.index,
                nonWitnessUtxo: Buffer.from(utxo.hex, 'hex'),
            });
        });

        psbt.addOutput({
            address: toAddress,
            value: amount,
        });

        psbt.signAllInputs(keyPair);
        psbt.finalizeAllInputs();

        return psbt.extractTransaction().toHex();
    }

    static validateAddress(address) {
        try {
            bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = new BitcoinService();
