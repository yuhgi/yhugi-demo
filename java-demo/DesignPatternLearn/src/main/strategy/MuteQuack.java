package com.racer.strategy;

public class MuteQuack implements QuackBehavior{
	public void quack(){
		System.out.println("<< Silence >>");
	}
}