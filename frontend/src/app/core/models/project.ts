import { Account } from './account';
import { Location } from './location';

export class Project {
    id: string;
    title: string;
    description: string;
    active: boolean;
    customer: Account;
    location: Location;
    startDate?: Date;
    endDate?: Date;
    created: Date;
    updated?: Date;
}
