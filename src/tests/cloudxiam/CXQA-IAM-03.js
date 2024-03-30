import { expect } from 'chai';
import { IAM } from '../../services/IAM.js';

const iam = new IAM();
const testData = [
    {
        group: 'FullAccessGroupEC2',
        policy: 'FullAccessPolicyEC2'
    },
    {
        group: 'FullAccessGroupS3',
        policy: 'FullAccessPolicyS3'
    },
    {
        group: 'ReadAccessGroupS3',
        policy: 'ReadAccessPolicyS3'
    }
]

describe('Verification of created groups', function () {
    testData.forEach(data => {
        const { group, policy } = data;

        it(`Verify ${group} is created with correct policy`, async function () {
            const policiesList = await iam.getAttachedPoliciesListForGroup(group);
            
            expect(policiesList.length).to.equal(1, `${group} contains more than 1 policy`);
            expect(policiesList[0].PolicyName).to.equal(policy, `Incorrect policy name for ${group}`);
        });
    })
});
