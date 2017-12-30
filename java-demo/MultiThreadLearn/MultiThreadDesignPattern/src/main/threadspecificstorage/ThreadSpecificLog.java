package com.racer.threadspecificstorage;

import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.IOException;

public class ThreadSpecificLog{
	private  PrintWriter writer = null;
	public ThreadSpecificLog(String fileName){
		try{
			writer = new PrintWriter(new FileWriter(fileName));
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	public void println(String s){
		writer.println(s);
	}

	public void close(){
		writer.println("==== END OF LOG====");
		writer.close();
	}


}