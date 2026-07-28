import { defineRelations } from 'drizzle-orm'

import { account, session, user, verification } from './schema'

export const authRelations = defineRelations(
  { user, session, account, verification },
  r => ({
    user: {
      sessions: r.many.session({ from: r.user.id, to: r.session.userId }),
      accounts: r.many.account({ from: r.user.id, to: r.account.userId }),
    },
    session: {
      user: r.one.user({ from: r.session.userId, to: r.user.id }),
    },
    account: {
      user: r.one.user({ from: r.account.userId, to: r.user.id }),
    },
  })
)
