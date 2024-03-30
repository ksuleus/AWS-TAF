import { expect } from 'chai';
import { IAM } from '../../services/IAM.js';

const iam = new IAM();
const testData = [
    {
        role: 'FullAccessRoleEC2',
        policy: 'FullAccessPolicyEC2'
    },
    {
        role: 'FullAccessRoleS3',
        policy: 'FullAccessPolicyS3'
    },
    {
        role: 'ReadAccessRoleS3',
        policy: 'ReadAccessPolicyS3'
    }
]

describe('Verification of created roles', function () {
    testData.forEach(data => {
        const { role, policy } = data;

        it(`Verify ${role} is created with correct policy`, async function () {
            const policiesList = await iam.getAttachedPoliciesListForRole(role);
            
            expect(policiesList.length).to.equal(1, `${role} contains more than 1 policy`);
            expect(policiesList[0].PolicyName).to.equal(policy, `Incorrect policy name for ${role}`);
        });
    })
});
