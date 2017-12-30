package com.racer.log4jLearn;

import org.apache.log4j.Logger;

public class HelloLog4j{
	private static Logger logger = Logger.getLogger(HelloLog4j.class);
	public static void main(String[] args) {
		logger.debug("This is debug message.");
		logger.info("This is info message");
		logger.error("This is error message");
	}
}