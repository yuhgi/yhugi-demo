package com.racer.junitlearn.test;
import junit.framework.TestSuite;
import junit.framework.Test;
import junit.textui.TestRunner;
import com.racer.junitlearn.service.*;

/**
 * 测试单元
 * 
 * @author Ren Wanchun
 * @version v1.0
 */
public class TestAll extends TestSuite{
	public static void main(String[] args) {
		TestRunner.run(suite());	
	}

	public static Test suite(){
		TestSuite suite = new TestSuite("TestSuite Test");
		suite.addTestSuite(TestCalculator.class);
		suite.addTestSuite(TestCalculator2.class);
		return suite;
	}
}