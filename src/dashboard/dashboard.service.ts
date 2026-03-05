// dashboard.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getData() {
    return {
      tasks: [
        { id: 1, title: 'Math Revision', status: 'pending' },
        { id: 2, title: 'Science Notes', status: 'completed' },
      ],
    };
  }
}
