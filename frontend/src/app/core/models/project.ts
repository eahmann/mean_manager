import { Account } from './account';
export class Project {
    id: string;
    title: string;
    description: string;
    active: boolean;
    customer: Account;
    locationId: string;
    startDate?: Date;
    endDate?: Date;
    created: Date;
    updated?: Date;
}
