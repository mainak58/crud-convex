import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createTask = mutation({
    args: { title: v.string(), body: v.string() },
    handler: async (ctx, args) => {
        const taskId = await ctx.db.insert("messages", {
            title: args.title,
            body: args.body,
        });
        return taskId;
    },
});

export const listTasks = query({
    handler: async (ctx) => {
        const tasks = await ctx.db.query("messages").collect();
        return tasks;
    },
});

export const getTask = query({
    args: { messagesId: v.id("messages") },
    handler: async (ctx, { messagesId }: { messagesId: Id<"messages"> }) => {
        const messagesById = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("_id"), messagesId))
            .collect();
        return messagesById;
    },
});

export const updateTask = mutation({
    args: { id: v.id("messages"), title: v.string(), body: v.string() },
    handler: async (ctx, args) => {
        const { id, title, body } = args;
        const message = await ctx.db.get(id);

        await ctx.db.patch(id, { title, body });
        return message;
    },
});

export const deleteTask = mutation({
    args: { id: v.id("messages") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
