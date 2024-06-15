require('jest-extended');
const { check } = require('../../build/Release/user_privilege_checker');

describe('UserPrivilegeChecker', () => {
    it('should return correct privilege level for existing user', () => {
        // Arrange
        const username = 'user';

        // Act
        const privilegeLevel = check(username);

        // Assert
        expect(privilegeLevel).toBeWithin(0, 3);

    });

    it('should return -1 for non-existing user', () => {
        // Arrange
        const username = 'nonExistingUser';

        // Act
        const privilegeLevel = check(username);

        // Assert
        expect(privilegeLevel).toBe(-1);
    });
});
