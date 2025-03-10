export interface Contract {
    id:number;
    type: 'CAR'| 'HOME' | 'HEALTH';
    effectiveDate: Date | null;
    expirationDate: Date | null;
    coverageAmount: number;
    clientId: number;
}
