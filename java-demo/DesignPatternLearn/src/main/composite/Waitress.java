package com.racer.composite;
public class Waitress{
	MenuComponent allMenus;
	public Waitress(MenuComponent allMenus){
		this.allMenus=allMenus;
	}
	public void printMenu(){
		allMenus.print();
	}

	public void printVegetarianMenu(){
		java.util.Iterator iterator = allMenus.createIterator();
		System.out.println("\nVEGERATIAN MENU\n------");
		while(iterator.hasNext()){
			MenuComponent component = (MenuComponent)iterator.next();
			try{
				if(component.isVegetarian()){
					component.print();
				}
			}
			catch(UnsupportedOperationException e){

			}
		}
	}
}