import { useCallback } from "react";
import { useState } from "react"
import { taskService } from "../api/taskService";
import { useEffect, useRef } from "react";

export const usePollTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const lastDateRef = useRef(null);

    const fetchUpdates = useCallback(async () => {
        try {
            const data = await taskService.getTasks(lastDateRef.current);
            if(data.length >0){
                lastDateRef.current = data[0].createdAt;
                setTasks(prev => {
                    if(!lastDateRef.current || prev.length === 0){
                        return data;
                    }
                    return [...prev, ...data];
                });
            } 
        } catch (err) {
            console.error("Erreur Pooling", err);
        }finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUpdates();
        const timer = setInterval(fetchUpdates, 5000);
        return () => clearInterval(timer);
    }, [fetchUpdates]);

    return {tasks, loading, refetch: fetchUpdates};
}