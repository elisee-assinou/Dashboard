import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

    @Get("date-system")
     getSystemDate() {
        const date =  this.systemService.getSystemTime()
        return date
    }
}
