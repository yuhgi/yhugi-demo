package com.yuhgi.designpattern.commandpattern;

public class LightOffCommand implements ICommand{
    private Receiver receiver;

    public LightOffCommand(Receiver receiver){
        this.receiver = receiver;
    }

    @Override
    public void execute(){
        receiver.turnOFF();
    }
}
