import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const waitlist = sqliteTable('waitlist', {
 email: text('email').primaryKey(),
 finish: text('finish').notNull(),
 createdAt: text('created_at').notNull(),
 consentVersion: text('consent_version').notNull(),
});
