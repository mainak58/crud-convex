import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    messages: defineTable({
        title: v.string(),
        body: v.string(),
    }),
});
