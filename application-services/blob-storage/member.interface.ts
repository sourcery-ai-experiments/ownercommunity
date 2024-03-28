import { MemberDataStructure } from "../../infrastructure-impl/datastore/data-structures/member";
import { BlobAuthHeader, MutationStatus } from "./_base.interfaces";

export interface MemberBlobStorageApplicationService {
  memberProfileAvatarRemove(memberId: string): Promise<MutationStatus>;
  memberProfileAvatarCreateAuthHeader(memberId: string, fileName: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult>;
}


export type MemberAvatarImageAuthHeaderResult = {
  authHeader?: BlobAuthHeader;
  member?: Member;
  status: MutationStatus;
};

export type Member = MemberDataStructure