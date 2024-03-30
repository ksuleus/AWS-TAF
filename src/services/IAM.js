import { 
    IAMClient, 
    GetPolicyCommand, 
    GetPolicyVersionCommand, 
    ListAttachedRolePoliciesCommand,
    ListAttachedGroupPoliciesCommand,
    ListGroupsForUserCommand
} from '@aws-sdk/client-iam';

import { ACCOUNT_ID } from '../data/account-data.js';

export class IAM {
    constructor(config = {}) {
        this.client = new IAMClient(config);
    }

    async getPolicyByName(PolicyName, ...otherData) {
        const input = {
            PolicyArn: this.getFullPolicyArn(PolicyName), 
            ...otherData
        };
        const command = new GetPolicyCommand(input);
        const response = await this.client.send(command);
        return response.Policy;
    }

    async getPolicyVersionByName(PolicyName, VersionId, ...otherData) {
        const input = {
            PolicyArn: this.getFullPolicyArn(PolicyName), 
            VersionId,
            ...otherData
        };
        const command = new GetPolicyVersionCommand(input);
        const response = await this.client.send(command);
        return response.PolicyVersion;
    }

    async getPolicyVersionStatementByName(PolicyName, VersionId, ...otherData) {
        const policyVersion = await this.getPolicyVersionByName(PolicyName, VersionId, ...otherData);
        const document = JSON.parse(decodeURIComponent(policyVersion.Document));
        return document.Statement;
    }

    async getAttachedPoliciesListForRole(RoleName, ...otherData) {
        const input = {
            RoleName, 
            ...otherData
        };
        const command = new ListAttachedRolePoliciesCommand(input);
        const response = await this.client.send(command);
        return response.AttachedPolicies;
    }

    async getAttachedPoliciesListForGroup(GroupName, ...otherData) {
        const input = {
            GroupName, 
            ...otherData
        };
        const command = new ListAttachedGroupPoliciesCommand(input);
        const response = await this.client.send(command);
        return response.AttachedPolicies;
    }

    async getGroupsListForUser(UserName, ...otherData) {
        const input = {
            UserName, 
            ...otherData
        };
        const command = new ListGroupsForUserCommand(input);
        const response = await this.client.send(command);
        return response.Groups;
    }

    getFullPolicyArn(PolicyName) {
        return `arn:aws:iam::${ACCOUNT_ID}:policy/${PolicyName}`;
    }
}