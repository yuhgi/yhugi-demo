package com.racer.iterator;

import com.racer.iterator.Menu;
import com.racer.iterator.MenuItem;
import java.util.Iterator;

public class Waitress{
	Menu pancakeHouseMenu;
	Menu dinerMenu;

	public Waitress(Menu pancakeHouseMenu,Menu dinerMenu){
		this.pancakeHouseMenu=pancakeHouseMenu;
		this.dinerMenu=dinerMenu;
	}

	public void printMenu(){
		Iterator pancakeHouseIterator = pancakeHouseMenu.createIterator();
		Iterator dinerIterator = dinerMenu.createIterator();

		System.out.println("MENU\n----\nBREAKFAST");
		printMenu(pancakeHouseIterator);
		System.out.println("\nLUNCH");
		printMenu(dinerIterator);
	}

	public void printMenu(Iterator iterator){
		while(iterator.hasNext()){
			MenuItem menuItem = (MenuItem)iterator.next();
			System.out.println(menuItem.getName()+", "+
								menuItem.getPrice()+" -- "+
								menuItem.getDescription());
		}
	}

}