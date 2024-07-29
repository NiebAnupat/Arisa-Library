import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { BookModule } from './book/book.module';
import { LibrarianModule } from './librarian/librarian.module';
import { MemberModule } from './member/member.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [PrismaModule.forRoot(), BookModule, LibrarianModule, MemberModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
