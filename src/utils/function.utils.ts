export const splitFullName = (fullName: string): { firstName: string, lastName: string } => {
    const [firstName, ...lastNameParts] = fullName.trim().split(' ');
    const lastName = lastNameParts.join(' ');
    return { firstName, lastName };
};