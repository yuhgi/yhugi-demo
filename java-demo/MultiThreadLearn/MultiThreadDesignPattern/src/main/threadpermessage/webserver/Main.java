package com.racer.threadpermessage.webserver;

import java.io.IOException;

public class Main{
	public static void main(String[] args) {
		try{
			new MiniServer(9999).execute();
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}