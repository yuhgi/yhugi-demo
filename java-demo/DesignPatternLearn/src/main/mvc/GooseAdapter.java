package com.racer.mvc;

public class GooseAdapter implements Quackable{
    Goose goose;
    Observable observable;
    public GooseAdapter(Goose goose){
        this.goose=goose;
        this.observable = new Observable(this);
    }

    public void registerObserver(Observer observer){
        observable.registerObserver(observer);
    }
    public void notifyObservers(){
        observable.notifyObservers();
    }

    public void quack(){
        goose.honk();
        notifyObservers();
    }
}