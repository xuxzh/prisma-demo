import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [PrismaModule, OperationModule],
  providers: [AppService],
})
export class AppModule {}
