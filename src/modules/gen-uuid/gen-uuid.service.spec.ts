import { Test, TestingModule } from '@nestjs/testing';
import { GenUuidService } from './gen-uuid.service';

describe('GenUuidService', () => {
  let service: GenUuidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenUuidService],
    }).compile();

    service = module.get<GenUuidService>(GenUuidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
