import { default as RegisterCommunityCreatedCreateDefaultRolesMemberHandler } from '../../../../../domain/events/handlers/community-created-create-default-roles-member';
import { DomainInfrastructureBDD } from './domain-infrastructure';
// import { default as RegisterRoleDeletedReassignMemberNewRoleHandler } from './role-deleted-reassign-member-new-role';
// import { default as RegisterCommunityCreatedCreateBlobContainerHandler } from './community-created-create-blob-container';
// import { default as RegisterCommunityDomainUpdatedUpdateDomainBlobHandler } from './community-domain-updated-update-domain-blob';
// import { default as RegisterCommunityDomainUpdatedUpdateVercel } from './community-domain-updated-update-vercel';
// import { default as RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler } from './community-white-label-domain-updated-update-domain-blob';
// import { default as RegisterPropertyDeletedUpdateSearchIndexHandler } from './property-deleted-update-search-index';
import { default as RegisterPropertyUpdatedUpdateSearchIndexHandler } from '../../../../../domain/events/handlers/property-updated-update-search-index';
// import { default as RegisterServiceTicketUpdatedUpdateSearchIndexHandler } from './service-ticket-updated-update-search-index';
// import { default as RegisterServiceTicketDeletedUpdateSearchIndexHandler } from './service-ticket-deleted-update-search-index';

const InitializeDomainBDD = (infrastructure: DomainInfrastructureBDD) => {
  // Register all event handlers
  RegisterCommunityCreatedCreateDefaultRolesMemberHandler(
    infrastructure.dataStore.communityUnitOfWork,
    infrastructure.dataStore.roleUnitOfWork,
    infrastructure.dataStore.memberUnitOfWork
  );
  // RegisterRoleDeletedReassignMemberNewRoleHandler();
  // RegisterCommunityCreatedCreateBlobContainerHandler(services.blobStorage);
  // RegisterCommunityDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  // RegisterCommunityDomainUpdatedUpdateVercel(services.vercel);
  // RegisterCommunityWhiteLabelDomainUpdatedUpdateDomainBlobHandler(services.blobStorage);
  // RegisterPropertyDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
  RegisterPropertyUpdatedUpdateSearchIndexHandler(
    infrastructure.cognitiveSearch,
    infrastructure.dataStore.propertyUnitOfWork
  );
  // RegisterServiceTicketUpdatedUpdateSearchIndexHandler(services.cognitiveSearch);
  // RegisterServiceTicketDeletedUpdateSearchIndexHandler(services.cognitiveSearch);
};

export default InitializeDomainBDD;