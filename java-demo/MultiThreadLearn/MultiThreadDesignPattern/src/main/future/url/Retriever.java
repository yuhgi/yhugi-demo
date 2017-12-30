package com.racer.future.url;

public class Retriever{
	public static Content retrieve(String urlStr){
		return new SyncContentImpl(urlStr);
	}
}