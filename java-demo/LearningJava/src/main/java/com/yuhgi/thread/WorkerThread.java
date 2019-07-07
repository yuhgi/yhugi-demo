package com.yuhgi.thread;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

public class WorkerThread implements Runnable {
    private ConcurrentLinkedQueue<Task> taskQueue; // 任务队列
    private ConcurrentHashMap<String,Object> resultMap; // 结果集

    public void setTaskQueue(ConcurrentLinkedQueue<Task> taskQueue) {
        this.taskQueue = taskQueue;
    }

    public void setResultMap(ConcurrentHashMap<String, Object> resultMap) {
        this.resultMap = resultMap;
    }

    @Override
    public void run(){
        while(true){
            Task task = this.taskQueue.poll();
            if(task == null) break;
            try{
                Object result = task.execute();
                this.resultMap.put(task.getTaskId(),result);
                Thread.sleep(500);
            }catch (Exception e){

            }

        }
    }
}
