package com.racer.composite;
import java.util.*;

public class Menu extends MenuComponent{
	ArrayList<MenuComponent> menuComponents = new ArrayList<MenuComponent>();
    String name;
    String description;

    public Menu(String name,String description){
        this.name=name;
        this.description=description;
    }

    public void add(MenuComponent menuComponent){
    	menuComponents.add(menuComponent);
    }

    public void remove(MenuComponent menuComponent){
		menuComponents.remove(menuComponent);
	}
	public MenuComponent getChild(int i){
		return (MenuComponent)menuComponents.get(i);
	}

	public String getName(){
		return this.name;
	} 

	public String getDescription(){
		return this.description;
	}

	public void print(){
		System.out.print("\n"+getName());
		System.out.print(", "+getDescription());
		System.out.println("--------------");

		Iterator iterator=menuComponents.iterator();
		while(iterator.hasNext()){
			MenuComponent menuComponent=(MenuComponent)iterator.next();
			menuComponent.print();
		}
	}

        public Iterator createIterator(){
        	return new CompositeIterator(menuComponents.iterator());
        }
}