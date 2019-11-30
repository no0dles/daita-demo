import {RelationalContext} from '@daita/core';
import {PostgresDataAdapter} from '@daita/core/dist/postgres';
import * as schema from './schema';

const postgresUrl = process.env.POSTGRES_URL || 'postgres://localhost/blog';

const dataAdapter = new PostgresDataAdapter(postgresUrl);
const context = new RelationalContext(schema, dataAdapter);

export = context;
