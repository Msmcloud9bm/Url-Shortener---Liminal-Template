// lightningNetworkService.js

// This module handles integration with the Lightning Network for creating and managing invoices.

// Dependencies
const axios = require('axios');

const LIGHTNING_NODE_URL = 'https://your-lightning-node-url'; // Replace with your Lightning node URL
const API_KEY = 'your-api-key'; // Replace with your actual API key if required

const lightningNetworkService = {
    async createInvoice(amount, memo) {
        try {
            const response = await axios.post(`${LIGHTNING_NODE_URL}/invoices`, { 
                amount, 
                memo,
                api_key: API_KEY // Include the API key if required
            });
            return response.data;
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw error;
        }
    },

    async checkInvoiceStatus(invoiceId) {
        try {
            const response = await axios.get(`${LIGHTNING_NODE_URL}/invoices/${invoiceId}`);
            return response.data;
        } catch (error) {
            console.error('Error checking invoice status:', error);
            throw error;
        }
    }
};

module.exports = lightningNetworkService;
