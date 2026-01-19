import { pgTable, text, timestamp, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password"),
    image: text("image"),
    role: text("role").default("student"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const profiles = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    city: text("city"),
    school: text("school"),
    grade: text("grade"),
    major: text("major"), // PPLG, TJKT, etc.
    grades: jsonb("grades"), // { math: 85, indonesian: 90, ... }
    utbkScore: integer("utbk_score"),
    interestResult: text("interest_result"), // RIASEC code or generic
    budget: text("budget"), // low, medium, high
    pathways: jsonb("pathways"), // ["PTN", "PTS"]
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
