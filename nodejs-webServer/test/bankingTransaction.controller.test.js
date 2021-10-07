/*
 * @File Name          : bankingTransaction.controller.test.js
 * @Description        : Tests REST API
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

const app = require("../server");
const request = require('supertest');

describe('bankingTransactions API', () => {

    it('should obtain all bankingTransactions', async () => {
        const { status } = await request(app).get('/api/bankingTransactions');
        expect(status).toEqual(200);

    });

    let id; //inserted record id
    it('should create a nemw bankingTransactions', async () => {
        const bankingTransaction = {
            amount: "0",
            concept: "0",
            balance: "0",
            operation: "+",
        };
        console.log(bankingTransaction);
        const { body, status } = await request(app).post('/api/bankingTransactions').send(bankingTransaction)
        console.log(body);
        id = body.id;
        expect(status).toEqual(200);

    });

    it('should obtain the previous record inserted finding by concept', async () => {
        const { status } = await request(app).get('/api/bankingTransactions?concept=0');
        expect(status).toEqual(200);
    });

    it('should delete the previous record inserted', async () => {
        const { status } = await request(app).delete('/api/bankingTransactions/' + id);
        expect(status).toEqual(200);
    });


});



