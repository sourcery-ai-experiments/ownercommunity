import { MemoryBaseAdapter } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { DomainExecutionContext } from "../../../../core/domain/contexts/domain-execution-context";
import { Community, CommunityProps } from "../../../../core/domain/contexts/community/community";
import { CommunityRepository } from "../../../../core/domain/contexts/community/community.repository";
import { UserEntityReference, UserProps } from "../../../../core/domain/contexts/user/user";

export class MemoryCommunity extends MemoryBaseAdapter implements CommunityProps {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  createdBy: UserProps;
  setCreatedByRef(user: UserEntityReference): void {
    this.createdBy = user
  }
} 

export class MemoryCommunityRepository<
  PropType extends CommunityProps, 
  DomainType extends Community<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements CommunityRepository<PropType> 
  {
  async getNewInstance(name: string, user: UserEntityReference): Promise<Community<PropType>> {
    return Community.getNewInstance(new MemoryCommunity as unknown as PropType, name, user, this.context);
  }

  async getByIdWithCreatedBy(id: string): Promise<Community<PropType>> {
    const community = await this.get(id);
    return community;
  }
}