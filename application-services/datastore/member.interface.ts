import { MemberDataStructure } from "../../infrastructure-impl/datastore/data-structures/member";

export interface MemberDatastoreApplicationService {
  getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<MemberDataStructure>;
  getMembers(): Promise<MemberDataStructure[]>;
  getMembersByCommunityId(communityId: string): Promise<MemberDataStructure[]>;
  getMembersAssignableToTickets(): Promise<MemberDataStructure[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure>;
}