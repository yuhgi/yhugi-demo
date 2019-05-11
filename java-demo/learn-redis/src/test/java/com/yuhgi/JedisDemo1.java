package com.yuhgi;
import org.junit.Assert;
import org.junit.Test;
import redis.clients.jedis.Jedis;

public class JedisDemo1 {
    @Test
    public void demo1(){
        Jedis jedis = new Jedis("192.168.110.132",6379);
        jedis.set("hello","world");
        String name = jedis.get("hello");
        Assert.assertEquals("world",name);
    }
}
