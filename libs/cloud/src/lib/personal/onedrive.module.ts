import { Module } from '@nestjs/common';
import { OnedriveService } from './onedrive.service';

@Module({
  providers: [OnedriveService],
})
export class OnedriveModule {}
