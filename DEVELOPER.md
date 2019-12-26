## Prisma 1 adaptations

### Conflicts with nexus-prisma plugin

nexus-prisma@0.4.x uses Prisma 2

from v.0.4.x nexus-prisma is a nexus plugin. It means no longer use ```makePrismaSchema``` but Nexus' ```makeSchema``` function instead.

```
- import { makePrismaSchema } from 'nexus-prisma'
+ import { nexusPrismaPlugin } from 'nexus-prisma'
+ import { makeSchema } from 'nexus'
  import * as types from './graphql'

- const schema = makePrismaSchema({
+ const schema = makeSchema({
-   types
+   types: [types, nexusPrismaPlugin({ types })],
  })
  ```