import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {

    getSystemTime() {
        const newDate = new Date();
        return newDate
      }
    
}

