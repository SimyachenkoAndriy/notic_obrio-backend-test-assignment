import { Module, Controller, Get } from '@nestjs/common';

@Controller()
class AppController {
  @Get()
  getHello(): string {
    return 'User-service dock container was successfully built and started!';
  }
}

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule {}
