import {RelationalTransactionContext} from '@daita/core/dist/data/context';
import {Author} from '../models/author';
import JwtUser = Express.JwtUser;

export async function createAuthorIfRequired(trx: RelationalTransactionContext, user: JwtUser) {
  if (!user.id) {
    throw new Error(`jwt token payload needs an id property`);
  }
  if (!user.username) {
    throw new Error(`jwt token payload needs an username property`);
  }

  const authors = await trx.select(Author)
    .where({id: user.id})
    .exec();

  if (authors.length === 0) {
    await trx.insert(Author)
      .value({
        id: user.id,
        username: user.username,
        firstName: null,
        lastName: null,
        biography: null,
      })
      .exec();
  }
}
