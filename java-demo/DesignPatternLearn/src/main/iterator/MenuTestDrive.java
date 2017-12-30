package com.racer.iterator;

import com.racer.iterator.impl.*;

public class MenuTestDrive{
	public static void main(String[] args) {
		PancakeHouseMenu pancakeHouseMenu = new PancakeHouseMenu();
		DinerMenu dinerMenu = new DinerMenu();
		Waitress waitress = new Waitress(pancakeHouseMenu,dinerMenu);
		waitress.printMenu();
	}
}