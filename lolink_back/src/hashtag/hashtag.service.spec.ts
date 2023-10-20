import { Test, TestingModule } from '@nestjs/testing';
import { HashtagService } from './hashtag.service';
import { Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  createQueryBuilder: jest.fn(),
});

describe('HashtagService', () => {
  let hashtagService: HashtagService;
  let hashtagRepository: MockRepository<Hashtag>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashtagService,
        {
          provide: getRepositoryToken(Hashtag),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    hashtagService = module.get<HashtagService>(HashtagService);
    hashtagRepository = module.get(getRepositoryToken(Hashtag));
  });

  describe('createHashtag', () => {
    it('should create hashtags', async () => {
      // given
      const tags = ['tag1', 'tag2'];
      const createdHashtags = [
        { id: 1, tag: 'tag1' },
        { id: 2, tag: 'tag2' },
      ];
      jest.spyOn(hashtagRepository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(hashtagRepository, 'create')
        .mockReturnValueOnce(createdHashtags[0]);
      jest
        .spyOn(hashtagRepository, 'save')
        .mockResolvedValueOnce(createdHashtags[0]);
      jest
        .spyOn(hashtagRepository, 'create')
        .mockReturnValueOnce(createdHashtags[1]);
      jest
        .spyOn(hashtagRepository, 'save')
        .mockResolvedValueOnce(createdHashtags[1]);

      // when
      const result = await hashtagService.createHashtag(tags);

      // then
      expect(hashtagRepository.findOne).toHaveBeenCalledTimes(2);
      expect(hashtagRepository.create).toHaveBeenCalledTimes(2);
      expect(hashtagRepository.save).toHaveBeenCalledTimes(2);
      expect(result).toEqual(createdHashtags);
    });

    it('should return existing hashtags', async () => {
      // given
      const tags = ['tag1', 'tag2'];
      const existingHashtags = [{ id: 1, tag: 'tag1' }];
      jest
        .spyOn(hashtagRepository, 'findOne')
        .mockResolvedValueOnce(existingHashtags[0]);

      // when
      const result = await hashtagService.createHashtag(tags);

      // then
      expect(hashtagRepository.findOne).toHaveBeenCalledTimes(2);
      expect(hashtagRepository.create).toHaveBeenCalled();
      expect(hashtagRepository.save).toHaveBeenCalled();
      expect(result).toEqual(existingHashtags);
    });
  });

  describe('findHashtags', () => {
    it('should find hashtags', async () => {
      // given
      const query = 'tag';
      const hashtags = [
        { id: 1, tag: 'tag1' },
        { id: 2, tag: 'tag2' },
      ];
      jest.spyOn(hashtagRepository, 'createQueryBuilder').mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(hashtags),
      } as any);

      // when
      const result = await hashtagService.findHashtags(query);

      // then
      expect(hashtagRepository.createQueryBuilder).toHaveBeenCalledWith(
        'hashtag',
      );
      expect(result).toEqual(hashtags);
    });
  });
});
