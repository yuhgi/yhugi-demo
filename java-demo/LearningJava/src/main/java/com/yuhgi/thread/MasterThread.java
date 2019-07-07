package com.yuhgi.thread;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.Map;

public class MasterThread {
    private ConcurrentLinkedQueue<Task> taskQueue = new ConcurrentLinkedQueue<>(); // 任务队列
    private ArrayList<Thread> workers = new ArrayList<>(); // worker集合
    private ConcurrentHashMap<String,Object> resultMap = new ConcurrentHashMap<>(); // 结果集

    public MasterThread(WorkerThread worker,int workerCount){
        worker.setTaskQueue(taskQueue);
        worker.setResultMap(resultMap);
        for(int i=0;i<workerCount;i++){
            workers.add(new Thread(worker));
        }
    }

    // 提交作业
    public void submit(Task task){
        taskQueue.add(task);
    }

    // 启动master
    public void start(){
        // 启动所有worker
        for(Thread me:workers){
            me.start();
        }
    }
    // 判断worker是否执行完毕
    public boolean isComplete() {
        for(Thread me:workers){
            if(me.getState() !=Thread.State.TERMINATED){
                return false;
            }
        }
        return true;
    }

    // 返回结果集
    public int getResult() {
        int total=0;
        for(Map.Entry<String, Object> result:resultMap.entrySet()){
            // 结果汇总
            total+=Integer.parseInt(result.getValue().toString());
        }
        return total;
    }
}
