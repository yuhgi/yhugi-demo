package com.racer.junitlearn.test;
import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import java.util.Arrays;

//import org.hamcrest.core.*;
import org.junit.Test;

public class AssertTest{
	@Test
	public void testAssertArrayEquals(){
		byte[] expected = "trial".getBytes();
		byte[] actual="trial".getBytes();
		org.junit.Assert.assertArrayEquals("failure - byte arrays not same",expected,actual);
	}

	@Test
	public void testAssertEquals(){
		org.junit.Assert.assertEquals("failure - strings not same.",51,51);
	}

	@Test
	public void testAssertFalse(){
		assertFalse("failure - should be false",false);
	}

	@Test
	public void testAssertNotNull(){
		assertNotNull("should not be null",new Object());
	}

	@Test
	public void testAssertNotSame(){
		assertNotSame("should not be same object",new Object(),new Object());
	}

	@Test
	public void testAssertNull(){
		assertNull("should be null",null);
	}

	@Test
	public void testAssertSame(){
		Integer n=Integer.valueOf(768);
		assertSame("should be same",n,n);
	}

	@Test
	public void testAssertThatBothContainsString(){
		assertThat("albumen",both(containsString("a")).and(containsString("b")));
	}
}