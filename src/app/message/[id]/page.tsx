"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

interface Message {
    _id: Id<"messages">;
    title: string;
    body: string;
}

function Messages() {
    const params = useParams();
    const router = useRouter();
    const getTask = useQuery(api.tasks.getTask, {
        messagesId: params.id as Id<"messages">,
    });
    const updateTask = useMutation(api.tasks.updateTask);
    const deleteTask = useMutation(api.tasks.deleteTask);

    const [editTaskId, setEditTaskId] = useState<Id<"messages"> | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    const handleEditClick = (task: Message) => {
        setEditTaskId(task._id);
        setEditTitle(task.title);
        setEditBody(task.body);
    };

    const handleUpdate = async () => {
        if (editTaskId) {
            await updateTask({
                id: editTaskId,
                title: editTitle,
                body: editBody,
            });
            setEditTaskId(null);
            setEditTitle("");
            setEditBody("");
        }
    };

    const handleDelete = async (id: Id<"messages">) => {
        await deleteTask({ id });
        router.push("/"); // Redirect after successful deletion
    };

    return (
        <>
            {getTask?.map((message) => (
                <div key={message._id}>
                    {editTaskId === message._id ? (
                        <div className="flex flex-col items-center w-full">
                            <input
                                className="border rounded p-2 mb-2"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <input
                                className="border rounded p-2 mb-2"
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleUpdate}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1>{message.title}</h1>
                            <p>{message.body}</p>
                            <Button onClick={() => handleEditClick(message)}>
                                Edit
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(message._id);
                                }}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default Messages;
