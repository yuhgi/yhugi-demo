package com.racer.mvc.dj.model;

import com.racer.mvc.dj.view.*;

public interface BeatModelInterface{
    //{{for controllers to invoke
    void initialize();
    void on();
    void off();
    void setBPM(int bpm);
    //}}

    //{{observer pattern. when the states change, notify view
    int getBPM();
    void registerObserver(BeatObserver o);
    void removeObserver(BeatObserver o);
    void registerObserver(BPMObserver o);
    void removeObserver(BPMObserver o);
    //}}
    
}