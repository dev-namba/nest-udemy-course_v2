

import { SetMetadata } from '@nestjs/common';
import { UserStatus } from '../user-status.enum';

export const Role = (...statuses: UserStatus[]) => SetMetadata('statuses', statuses);

