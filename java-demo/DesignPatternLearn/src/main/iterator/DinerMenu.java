package com.racer.iterator;
import com.racer.iterator.MenuItem;
import com.racer.iterator.Menu;
import com.racer.iterator.impl.DinerMenuIterator;
import java.util.Iterator;

public class DinerMenu implements Menu{
	static final int MAX_ITEMS=6;
	int numberOfItems=0;
	MenuItem[] menuItems;

	public DinerMenu(){
		menuItems = new MenuItem[MAX_ITEMS];
		addItem("Vegetarian BLT","(Fakin') Bacon with letture & tomato on whole wheat",true,2.99);
		addItem("BLT","(Fakin') Bacon with letture & tomato on whole wheat",false,2.99);
		addItem("Soup of the day","Soup of the day, with a side of potato salad",false,3.29);
		addItem("Hotdog","A hot dog, with saurkraut, relish, onions, topped with cheese",false,3.05);
	}

	public void addItem(String name,String description,boolean vegetarian,double price){
		MenuItem menuItem = new MenuItem(name,description,vegetarian,price);
		if(numberOfItems>=MAX_ITEMS)
			System.out.println("Sorry, menu is full! Can't add item to menu");
		else{
			menuItems[numberOfItems++]=menuItem;
		}
	}

	public Iterator createIterator(){
		return new DinerMenuIterator(menuItems);
	}
}