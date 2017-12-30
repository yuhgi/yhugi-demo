package com.racer.junitlearn.test;
import junit.framework.TestCase;
import com.racer.junitlearn.service.*;

/**
 * Calculator类的测试用例
 * 
 * @author Ren Wanchun
 * @version v1.0
 */

public class TestCalculator2 extends TestCase{
	public void testAdd(){
		Calculator calculator = new Calculator();
		double result = calculator.add(4,5);
		assertEquals(9,result,0);
	}
}