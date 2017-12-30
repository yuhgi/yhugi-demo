package com.racer.strategy;
public class MiniDuckSimulator{
	public static void main(String[] args){
		Duck mallard=new MallardDuck();
		mallard.performQuack();
		mallard.performFly();
		mallard.display();

		Duck model=new ModelDuck();
		model.performFly();
		model.setFlyBehavior(new FlyRocketPowered());
		model.performFly();
		model.performQuack();
		model.display();
	}
}
