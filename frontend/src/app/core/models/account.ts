﻿import { Role } from './role';

export interface Account {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    jwtToken?: string;
}