import { Controller, Get, Res } from '@nestjs/common';
import { View } from '../common/libs/View';

@Controller('home')
export class HomeController {
    @Get()
    index(): View {
        return new View('home/home.art')
    }
}
