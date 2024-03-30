import { expect } from 'chai';
import { IAM } from '../../services/IAM.js';

const iam = new IAM();
const testData = [
    {
        policy: 'FullAccessPolicyEC2', 
        action: 'ec2:*',
        effect: 'Allow',
        resource: '*'
    },
    {
        policy: 'FullAccessPolicyS3', 
        action: 's3:*',
        effect: 'Allow',
        resource: '*'
    },
    {
        policy: 'ReadAccessPolicyS3', 
        action: [ 's3:Describe*', 's3:Get*', 's3:List*' ],
        effect: 'Allow',
        resource: '*'
    }
]

describe('Verification of created policies', function () {
    testData.forEach(data => {
        const { policy, action, effect, resource } = data;

        it(`Verify ${policy} is created with correct params`, async function () {
            const policyData = await iam.getPolicyByName(policy);
            const version = policyData.DefaultVersionId;
    
            const statementList = await iam.getPolicyVersionStatementByName(policy, version);
            expect(statementList.length).equal(1, `Statement list length for ${policy} is incorrect`);
            expect(statementList[0].Action).deep.equal(action, `Action for ${policy} is incorrect`);
            expect(statementList[0].Effect).deep.equal(effect, `Effect for ${policy} is incorrect`);
            expect(statementList[0].Resource).deep.equal(resource, `Resource for ${policy} is incorrect`);
        });
    })
});
