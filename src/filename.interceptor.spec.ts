import { FilenameInterceptor } from './filename.interceptor';

describe('FilenameInterceptor', () => {
  it('should be defined', () => {
    expect(new FilenameInterceptor('a')).toBeDefined();
  });
});
