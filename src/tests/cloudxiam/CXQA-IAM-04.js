import { expect } from 'chai';
import { IAM } from '../../services/IAM.js';

const iam = new IAM();
const testData = [
    {
        user: 'FullAccessUserEC2',
        group: 'FullAccessGroupEC2',
    },
    {
        user: 'FullAccessUserS3',
        group: 'FullAccessGroupS3',
    },
    {
        user: 'ReadAccessUserS3',
        group: 'ReadAccessGroupS3',
    }
]

describe('Verification of created users', function () {
    testData.forEach(data => {
        const { user, group } = data;

        it(`Verify ${user} is created with correct group`, async function () {
            const groupList = await iam.getGroupsListForUser(user);
            
            expect(groupList.length).to.equal(1, `${user} contains more than 1 policy`);
            expect(groupList[0].GroupName).to.equal(group, `Incorrect policy name for ${user}`);
        });
    })
});
