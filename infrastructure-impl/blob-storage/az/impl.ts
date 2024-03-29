import { AzBlobStorage } from "../../../services-seedwork-blob-storage-az";
import { BlobStorageInfrastructureService } from "../../../infrastructure-services/blob-storage";

export class AzBlobStorageImpl extends AzBlobStorage implements BlobStorageInfrastructureService {
   
  constructor(accountName: string, accountKey: string) {
      super(accountName,  accountKey);
  }

  startup = async (): Promise<void> => {
    console.log('AzBlobStorageImpl startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('AzBlobStorageImpl shutdown');
  }
}
