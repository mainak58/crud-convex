import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


function LoadingData() {
    const data = useQuery(api.tasks.listTasks);
    const router = useRouter();
    return (
        <>
            <div className="message-container">
                {data?.map((message) => (
                    <div key={message._id} className="message-card">
                        <li>{message.title}</li>
                        <li>{message.body}</li>
                        <Button onClick={() => {
                            router.push(`/message/${message._id}`);
                        }}>Load More</Button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default LoadingData;
