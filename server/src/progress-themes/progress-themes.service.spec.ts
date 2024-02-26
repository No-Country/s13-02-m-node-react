import { Test, TestingModule } from '@nestjs/testing';
import { ProgressThemesService } from './progress-themes.service';

describe('ProgressThemesService', () => {
  let service: ProgressThemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressThemesService],
    }).compile();

    service = module.get<ProgressThemesService>(ProgressThemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
