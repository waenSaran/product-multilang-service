import { Test, TestingModule } from '@nestjs/testing';
import { UuidGeneratorService } from './uuid-generator.service';

describe('UuidGeneratorService', () => {
  let service: UuidGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidGeneratorService],
    }).compile();

    service = module.get<UuidGeneratorService>(UuidGeneratorService);
  });

  it('should return string uuid', () => {
    expect(typeof service.generate()).toBe('string');
  });
});
