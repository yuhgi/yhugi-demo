package com.racer.threadspecificstorage;

public class Log{
	private static final ThreadLocal<ThreadSpecificLog> tsLogCollection = new ThreadLocal<ThreadSpecificLog>();

	public static void println(String s){
		getTsLog().println(s);
	}

	public static void close(){
		getTsLog().close();
	}

	private static ThreadSpecificLog getTsLog(){
		ThreadSpecificLog tsLog = tsLogCollection.get();
		if(tsLog == null){
			tsLog = new ThreadSpecificLog(Thread.currentThread().getName()+"-log.txt");
			tsLogCollection.set(tsLog);
		}
		return tsLog;
	}
}