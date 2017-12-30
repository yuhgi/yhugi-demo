package com.racer.composite;

public class MenuTestDrive{
    public static void main(String[] args) {
        MenuComponent pancakeHouseMenu=new Menu("PANCAKE HOUSE MENU","BREAKFAST");
        MenuComponent dinerMenu=new Menu("DINER MENU","LUNCH");
        MenuComponent cafeMenu=new Menu("CAFE MENU","DINNER");
        MenuComponent dessertMenu=new Menu("DESSERT MENU","DESSERT OF COURSE");

        MenuComponent allMenus=new Menu("ALL MENUS","ALL MENUS COMBINED");

        allMenus.add(pancakeHouseMenu);
        allMenus.add(dinerMenu);
        allMenus.add(cafeMenu);

        pancakeHouseMenu.add(new MenuItem("K&B's Pancake Breakfast",
            "Pancake with scrambled eggs, and toast",true,2.99));
        pancakeHouseMenu.add(new MenuItem("Regular Pancake Breakfast",
            "Pancake with fried eggs, and sausage",false,2.99));
        pancakeHouseMenu.add(new MenuItem("Blueberry Pancakes",
            "Pancakes made with fresh blueberries",true,3.49));
        pancakeHouseMenu.add(new MenuItem("Waffles",
            "with your choices of blueberries or strawberries",true,3.59));
        dinerMenu.add(new MenuItem("Vegetarian BLT","(Fakin') Bacon with letture & tomato on whole wheat",true,2.99));
        dinerMenu.add(new MenuItem("BLT","(Fakin') Bacon with letture & tomato on whole wheat",false,2.99));
        dinerMenu.add(new MenuItem("Soup of the day","Soup of the day, with a side of potato salad",false,3.29));
        dinerMenu.add(new MenuItem("Hotdog","A hot dog, with saurkraut, relish, onions, topped with cheese",false,3.0));

        dinerMenu.add(new MenuItem(
            "Pasta",
            "Spaghetti with Marinara Sauce, and a slice of sourdough bread",
            true,
            3.89));
        dinerMenu.add(dessertMenu);
        dessertMenu.add(new MenuItem(
            "Apple Pie",
            "Apple pie with a flakey crust, topped with vanilla ice cream",
            true,
            1.59
            ));

        Waitress waitress = new Waitress(allMenus);
        waitress.printMenu();
        waitress.printVegetarianMenu();
    }


}