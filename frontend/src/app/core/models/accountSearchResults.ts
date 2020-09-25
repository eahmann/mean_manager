import { Account } from './account';

export interface AccountSearchResult {
    items: Account[];
    total_count: number;
}
