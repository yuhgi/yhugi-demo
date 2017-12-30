package com.racer.balking;

import java.io.IOException;
import java.io.FileWriter;
import java.io.Writer;

public class Data{
	private final String fileName;
	private String content;
	private boolean changed;

	public Data(String fileName,String content){
		this.fileName = fileName;
		this.content = content;
		this.changed = true;
	}

	public synchronized void change(String newContent){
		content = newContent;
		changed = true;
	}

	public synchronized void save() throws IOException{
		if(!changed){
			System.out.println(Thread.currentThread().getName()+"calls save. RETURN!");
			return;
		}

		doSave();
		/*try{
			Thread.sleep(1000);
		}
		catch(InterruptedException e){
			e.printStackTrace();
		}*/
		changed = false;
	}

	private void doSave() throws IOException{
		System.out.println(Thread.currentThread().getName()+" calls doSave, content = "+content);
		Writer writer = new FileWriter(fileName);
		writer.write(content);
		writer.close();
	}
}