package com.yuhgi.designpattern.commandpattern;

public class LightOnCommand implements ICommand{
    private Receiver receiver;

    public LightOnCommand(Receiver receiver){
        this.receiver = receiver;
    }

    @Override
    public void execute(){
        receiver.turnON();
    }
}

