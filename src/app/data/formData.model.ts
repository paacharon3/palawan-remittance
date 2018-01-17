export class FormData {
    // transaction details
    amount: number = 0;
    cashInCenter: string = '';
    serviceFee: number = 0;
    senderFirstName: string = '';
    senderLastName: string = '';
    senderContact: string = '';
    receiverFirstName: string = '';
    receiverLastName: string = '';
    receiverContact: string = '';

    firstName: string = '';
    lastName : string = '';
    email: string = '';
    work: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }

    clearTransactionDetails(){
        this.amount = 0;
        this.cashInCenter = '';
        this.senderFirstName = '';
        this.senderLastName = '';
        this.senderContact = '';
        this.receiverFirstName = '';
        this.receiverLastName = '';
        this.receiverContact = '';
    }
}

export class Personal {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
}

export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}

export class Transaction {
    amount: number = 0;
    cashInCenter: string = '';
    serviceFee: number = 0;
    senderFirstName: string = '';
    senderLastName: string = '';
    senderContact: string = '';
    receiverFirstName: string = '';
    receiverLastName: string = '';
    receiverContact: string = '';
    sevenPayRefNo: string = '';
    transactionDate: string ='';
    transactionExpiryDate: string='';
    remittanceRefNo: string = '';
    // get getAmount(): number {
    //     return this.amount;
    // }

    // set setAmount(amount: number) {
    //     this.amount = amount;
    // }
}

export class TransactionAmount {
    amount: number=0;
}
