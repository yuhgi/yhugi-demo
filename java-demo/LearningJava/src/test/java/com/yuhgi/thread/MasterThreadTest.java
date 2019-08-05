package com.yuhgi.thread;

import org.junit.Test;

public class MasterThreadTest {
    @Test
    public void masterStart(){
        MasterThread masterThread = new MasterThread(new WorkerThread(), Runtime.getRuntime().availableProcessors());
        //添加100个任务
        for(int i=0;i<20;i++){
            Task task= new Task();
            task.setTaskId(""+i);
            task.setTaskName("任务"+i);
            masterThread.submit(task);
        }

        //执行任务
        masterThread.start();

        long start=System.currentTimeMillis();
        while(true){
            if(masterThread.isComplete()){
                long end=System.currentTimeMillis()-start;
                int result = masterThread.getResult();
                System.out.println("最终结果："+result+",最终耗时："+end);
                break;
            }
        }
    }
}
