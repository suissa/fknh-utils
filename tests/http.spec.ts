import {
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
} from '../src/index';

describe('http utils with JSONPlaceholder', () => {
  it('should fetch a list of posts', async () => {
    const posts = await httpGet<any[]>('https://jsonplaceholder.typicode.com/posts');
    expect(Array.isArray(posts)).toBe(true);
    expect(posts[0]).toHaveProperty('id');
  });

  it('should fetch a single post', async () => {
    const post = await httpGet<any>('https://jsonplaceholder.typicode.com/posts/1');
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('title');
  });

  it('should create a new post', async () => {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    const created = await httpPost<any>('https://jsonplaceholder.typicode.com/posts', payload);
    expect(created).toMatchObject(payload);
    expect(created).toHaveProperty('id');
  });

  it('should update a post', async () => {
    const payload = { title: 'new title', body: 'new body', userId: 1 };
    const updated = await httpPut<any>('https://jsonplaceholder.typicode.com/posts/1', payload);
    expect(updated).toMatchObject(payload);
  });

  it('should patch a post', async () => {
    const payload = { title: 'patched title' };
    const patched = await httpPatch<any>('https://jsonplaceholder.typicode.com/posts/1', payload);
    expect(patched).toHaveProperty('title', 'patched title');
  });

  it('should delete a post', async () => {
    const deleted = await httpDelete<any>('https://jsonplaceholder.typicode.com/posts/1');
    // JSONPlaceholder retorna objeto vazio no delete
    expect(deleted).toEqual({});
  });
});
