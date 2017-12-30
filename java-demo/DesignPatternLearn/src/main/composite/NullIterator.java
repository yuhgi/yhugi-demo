package com.racer.composite;

import java.util.*;

public class NullIterator implements Iterator{
    public void remove(){
        throw new UnsupportedOperationException();
    }

    public boolean hasNext(){
        return false;
    }

    public Object next(){
        return null;
    }
}