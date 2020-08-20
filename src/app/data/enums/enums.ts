export enum INVOICE_STATE {
    OPEN = "Ouverte",
    VALIDATE = "Validée",
    IN_PAYMENT = "En paiement",
    PAID = "Soldée",
    CANCEL = "Annulée"
}
export enum PAYMENT_STATE {
    PENDING = "En attente",
    VALIDATE = "Payée"
}
export enum ORDER_STATE {
    WAITING = "En attente",
    MADE = "Faite"
}
export enum STOCK_OUT_STATE {
    WAITING = "En attente",
    VALIDATE = "Valider"
}
export enum METHOD_OF_PAYMENT {
    CHECK = "Chèque",
    TRANSFER = "Virement",
    CASH = "Espèce"
}