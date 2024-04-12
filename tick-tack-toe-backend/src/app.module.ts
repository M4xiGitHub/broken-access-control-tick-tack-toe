import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { Module } from '@nestjs/common';
import { SocketModule } from './SocketIO/socket.module';

@Module({
  imports: [AuthModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
