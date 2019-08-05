package com.yuhgi.designpattern.commandpattern;

import java.util.concurrent.ConcurrentLinkedQueue;

public class Invoker {
    private ConcurrentLinkedQueue<ICommand> commandQueue = new ConcurrentLinkedQueue<>();
    public void addCommand(ICommand command){
        commandQueue.add(command);
    }
    public void execute( ){
        while (true){
            ICommand task = commandQueue.poll();
            if(task!=null){
                task.execute();
            }else{
                break;
            }
        }

    }
}
