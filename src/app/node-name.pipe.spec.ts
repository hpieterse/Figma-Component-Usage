import { NodeNamePipe } from './node-name.pipe';

describe('NodeNamePipe', () => {
  it('create an instance', () => {
    const pipe = new NodeNamePipe();
    expect(pipe).toBeTruthy();
  });
});
