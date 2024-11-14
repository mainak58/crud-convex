"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import LoadingData from "@/components/LoadingData";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
    const createMessages = useMutation(api.tasks.createTask);
    const { toast } = useToast();

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await createMessages({
                title: formData.get("title") as string,
                body: formData.get("body") as string,
            });

            toast({
                description: "Your message has been sent.",
            });
        } catch (error) {
            console.error("Failed to create message:", error);
        }
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleCreate} className="form-group">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="input-field"
                        placeholder="Enter title"
                    />
                    <input
                        type="text"
                        id="body"
                        name="body"
                        className="input-field"
                        placeholder="Enter body"
                    />
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>

            <LoadingData />
        </>
    );
}
