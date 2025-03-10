export interface Claim {
    id:number;
    date: Date | null;
    description: string;
    claimedAmount: number;
    reimbursedAmount: number;
    contractId: number;
}
