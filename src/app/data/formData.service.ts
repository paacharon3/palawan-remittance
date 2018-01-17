import { CashInCenter } from './../cash-in-center/cash-in-center';
import { Injectable }                        from '@angular/core';

import { FormData, Personal, Address, TransactionAmount, Transaction }       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private transaction: Transaction = new Transaction();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;
    private amountFormValid: boolean = false;
    private selectedCashInCenter: CashInCenter;
    constructor(private workflowService: WorkflowService) {
    }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email
        };
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        // Validate Personal Step in Workflow
        // this.workflowService.validateStep(STEPS.personal);
    }

    getWork() : string {
        // Return the work type
        return this.formData.work;
    }

    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        // this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        // this.workflowService.validateStep(STEPS.address);
    }

    getTransactionAmount(): TransactionAmount {
        var transactionAmount: TransactionAmount = {
            amount: 0
        };
        return transactionAmount;
    }

    getTransaction(): Transaction {
        var transaction: Transaction = {
            amount: this.formData.amount,
            cashInCenter: this.formData.cashInCenter,
            serviceFee: this.formData.serviceFee,
            senderFirstName: this.formData.senderFirstName,
            senderLastName: this.formData.senderLastName,
            senderContact: this.formData.senderContact,
            receiverFirstName: this.formData.receiverFirstName,
            receiverLastName: this.formData.receiverLastName,
            receiverContact: this.formData.receiverContact,
            sevenPayRefNo: this.transaction.sevenPayRefNo,
            transactionDate: this.transaction.transactionDate,
            remittanceRefNo: this.transaction.remittanceRefNo,
            transactionExpiryDate: this.transaction.transactionExpiryDate
        }
        console.log("returning transaction: " + transaction);
        return transaction;
    }

    setTransaction(data: Transaction) {
        console.log("setTransactionAmount : " + data);
        this.amountFormValid = true;
        this.transaction.amount = data.amount;
        this.transaction.cashInCenter = data.cashInCenter;
        this.transaction.senderFirstName = data.senderFirstName;
        this.transaction.senderLastName = data.senderLastName;
        this.transaction.senderContact = data.senderContact;
        this.transaction.receiverFirstName = data.receiverFirstName;
        this.transaction.receiverLastName = data.receiverLastName;
        this.transaction.receiverContact = data.receiverContact;
        console.log('assignment of data complete.');
    }
    
    setTransactionDetails(data: Transaction){
        console.log("setTransactionDetails : " + data);
        this.transaction.senderFirstName = data.senderFirstName.toUpperCase();
        this.transaction.senderLastName = data.senderLastName.toUpperCase();
        this.transaction.senderContact = data.senderContact.toUpperCase();
        this.transaction.receiverFirstName = data.receiverFirstName.toUpperCase();
        this.transaction.receiverLastName = data.receiverLastName.toUpperCase();
        this.transaction.receiverContact = data.receiverContact.toUpperCase();
        console.log('assignment of sender and receiver details complete.');

        //validate transaction details step
        this.workflowService.validateStep(STEPS.transactionDetail);
    }

    setTransactionAmount(amount: number) {
        console.log("setTransactionAmount : " + amount);
        this.amountFormValid = true;
        this.formData.amount = amount;
        this.transaction.amount = amount;
        console.log('assignment of amount complete.');

        //validate send money step
        this.workflowService.validateStep(STEPS.sendMoney);
    }

    setCashInCenter(data: CashInCenter) {
        this.transaction.cashInCenter = data.id; //remcoID
        this.transaction.serviceFee = data.serviceFee;
        this.selectedCashInCenter = data;
        //validate cash in center step
        this.workflowService.validateStep(STEPS.cashIn);
    }

    getSelectedCashInCenter(): CashInCenter {
        return this.selectedCashInCenter;
    }

    confirmTransaction(data: Transaction) {
        //validation only
        this.workflowService.validateStep(STEPS.transactionConfirmation);
    }

    getTransactionData(): Transaction {
        return this.transaction;
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        // this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid &&
                this.isAddressFormValid;
    }
}
