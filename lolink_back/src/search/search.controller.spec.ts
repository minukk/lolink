import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Post } from '../post/post.entity';

describe('SearchController', () => {
  let controller: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    searchService = module.get<SearchService>(SearchService);
  });

  describe('search', () => {
    it('should return search results', async () => {
      // given
      const newPost = new Post();
      const query = 'test';
      const searchResults = {
        posts: [{ ...newPost, id: 1, title: 'test post' }],
        products: [],
      };
      jest.spyOn(searchService, 'search').mockResolvedValueOnce(searchResults);

      // when
      const result = await controller.search({ query });

      // then
      expect(searchService.search).toHaveBeenCalledWith(query);
      expect(result).toEqual(searchResults);
    });
  });
});
