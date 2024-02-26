import { Test, TestingModule } from '@nestjs/testing';
import { ProgressThemesController } from './progress-themes.controller';
import { ProgressThemesService } from './progress-themes.service';

describe('ProgressThemesController', () => {
  let controller: ProgressThemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressThemesController],
      providers: [ProgressThemesService],
    }).compile();

    controller = module.get<ProgressThemesController>(ProgressThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
