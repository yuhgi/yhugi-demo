package com.racer.proxy.remoteproxy.impl;
import com.racer.proxy.remoteproxy.*;
import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;
import java.rmi.Naming;

public class MyRemoteImpl extends UnicastRemoteObject implements MyRemote{
	@Override
	public String sayHello(){
		return "Server says, 'hey'";
	}

	public MyRemoteImpl()throws RemoteException{

	}
	public static void main(String[] args) {
		try{
			MyRemote service = new MyRemoteImpl();
			Naming.rebind("RemoteHello",service);
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
}