import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/common/constants/key.decorator';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
