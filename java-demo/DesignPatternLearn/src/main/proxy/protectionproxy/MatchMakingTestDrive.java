package com.racer.proxy.protectionproxy;
import com.racer.proxy.protectionproxy.impl.*;
import java.lang.reflect.*;

public class MatchMakingTestDrive{
    public static void main(String[] args) {
        MatchMakingTestDrive test = new MatchMakingTestDrive();
        test.drive();
    }

    public MatchMakingTestDrive(){
        initializeDatabase();
    }

    public void initializeDatabase(){
        System.out.println("Initialize database...");
    }

    public PersonBean getPersonFromDatabase(String name){
        System.out.println("Simulating generate a person bean...");
        PersonBean person=new PersonBeanImpl(name,"male","dance, sing",0);
        return person;
    }
    public void drive(){
        PersonBean joe=getPersonFromDatabase("Joe Javabean");
        PersonBean ownerProxy = getOwnerProxy(joe);
        System.out.println("Name is "+ownerProxy.getName());
        ownerProxy.setInterests("bowing, go");
        System.out.println("Interests set from owner proxy");
        System.out.println("Interests are "+ownerProxy.getInterests());
        try{
            ownerProxy.setHotOrNotRating(10);
        }catch(Exception e){
            System.out.println("Can't set rating from owner proxy");
        }
        System.out.println("Rating is "+ownerProxy.getHotOrNotRating());

        PersonBean nonOwnerProxy = getNonOwnerProxy(joe);
        System.out.println("Name is "+nonOwnerProxy.getName());
        try{
            nonOwnerProxy.setInterests("bowing, go");
        }catch(Exception e){
            System.out.println("Can't set interests from non owner proxy");
        }
        nonOwnerProxy.setHotOrNotRating(3);
        System.out.println("Rating set from non owner proxy");
        System.out.println("Rating is "+nonOwnerProxy.getHotOrNotRating());
    }

    public PersonBean getOwnerProxy(PersonBean person){
        return (PersonBean)Proxy.newProxyInstance(
            person.getClass().getClassLoader(),
            person.getClass().getInterfaces(),
            new OwnerInvocationHandler(person));
    }
    public PersonBean getNonOwnerProxy(PersonBean person){
        return (PersonBean)Proxy.newProxyInstance(
            person.getClass().getClassLoader(),
            person.getClass().getInterfaces(),
            new NonOwnerInvocationHandler(person));
    }

}