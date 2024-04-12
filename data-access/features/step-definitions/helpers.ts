import { RoleProps } from "../../src/app/domain/contexts/community/role";

// remove word before {. 
// for example, description DuyTheOwner{actor} is the admin member of Community1{word} will be converted into "{actor} creates a new community named {word}."
export const DescriptionParser = (description: string) => {
  const values = description.split(' ').filter(word => word.includes('{'));
  // delete values
  let result = description;
  values.forEach(value => {
    result = result.replace(value, `{${value.split('{')[1]}`);
  });

  return result;
};

export const IsAdminRole = (role: RoleProps) => {
  let result = false;
  if (
    role.roleName === 'admin' &&
    role.isDefault &&
    role.permissions.communityPermissions.canManageRolesAndPermissions &&
    role.permissions.communityPermissions.canManageCommunitySettings &&
    role.permissions.communityPermissions.canManageSiteContent &&
    role.permissions.communityPermissions.canManageMembers &&
    role.permissions.communityPermissions.canEditOwnMemberProfile &&
    role.permissions.communityPermissions.canEditOwnMemberAccounts &&
    role.permissions.propertyPermissions.canManageProperties &&
    role.permissions.propertyPermissions.canEditOwnProperty &&
    role.permissions.serviceTicketPermissions.canCreateTickets &&
    role.permissions.serviceTicketPermissions.canManageTickets &&
    role.permissions.serviceTicketPermissions.canAssignTickets &&
    role.permissions.serviceTicketPermissions.canWorkOnTickets
  ) {
    result = true;
  }
  return result;
};

export const _ = {
  // Account
  AnAccountIsCreatedByActor: 'An account with first name {word}, last name {word} for {word} using externalId of {actor} in {word} is created by {actor}',

  // Community
  UserCreatesANewCommunity: '{actor} creates a new community named {word}',

  // Member
  MemberIsTheAdminMemberOfCommunity: '{actor} is the admin member of {word}',
  MemberAddsANewMemberToCommunity: '{actor} adds a new member named {word} to {word}',
  

  // Property


  // Role

  // ServiceTicket

  // User
  UserIsAMemberOfCommunityUnderMemberNamed: '{actor} should be a member of {word} under member named {word}',

}