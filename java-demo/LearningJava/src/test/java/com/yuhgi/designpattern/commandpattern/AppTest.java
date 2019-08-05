package com.yuhgi.designpattern.commandpattern;

import org.junit.Test;

/**
 * 命令模式
 * 命令调用者（接收命令），命令接收者（执行实际命令），抽象命令，具体命令，客户端（发送命令）
 */

public class AppTest {
    @Test
    public void start(){
        Receiver receiver = new Receiver();
        Invoker invoker = new Invoker();

        ICommand turnOnLight = new LightOnCommand(receiver);
        ICommand turnOffLight = new LightOffCommand(receiver);


        for(int i=0;i<100;i++){
            invoker.addCommand(turnOnLight);
            invoker.addCommand(turnOffLight);
        }
        invoker.execute();
    }
}
