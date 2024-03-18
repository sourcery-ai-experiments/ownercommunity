// import { IContentModerator } from '../../../infrastructure/services/content-moderator';
// import { IVercel } from '../../../infrastructure/services/vercel';
// import { ICognitiveSearch } from '../../../infrastructure/services/cognitive-search';
// import { IBlobStorage } from '../../../infrastructure/services/blob-storage';
// import { CommunityUnitOfWork } from '../../domain/contexts/community/community.uow';
// import { MemberUnitOfWork } from '../../domain/contexts/community/member.uow';
// import { RoleUnitOfWork } from '../../domain/contexts/community/role.uow';
import { IDataStore } from '../../../../../domain/services/datastore/interfaces';

export interface IServices {
  // vercel: IVercel;
  // contentModerator: IContentModerator;
  // cognitiveSearch: ICognitiveSearch;
  // blobStorage: IBlobStorage;
  // communityUnitOfWork: CommunityUnitOfWork;
  // memberUnitOfWork: MemberUnitOfWork;
  // roleUnitOfWork: RoleUnitOfWork;
  dataStore: IDataStore;
}
