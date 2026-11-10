import { pgTable, text } from 'drizzle-orm/pg-core';
export const waitlist = pgTable('waitlist', {
 email: text('email').primaryKey(),
 finish: text('finish').notNull(),
 createdAt: text('created_at').notNull(),
 consentVersion: text('consent_version').notNull(),
});
