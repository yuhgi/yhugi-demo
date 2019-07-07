package com.yuhgi.thread;

public class Task {
    private String taskId; // 任务Id
    private String taskName; // 任务名称

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Object execute(){
        System.out.println("线程:"+Thread.currentThread().getName()+",执行:"+getTaskName());
        return 1;
    }
}
