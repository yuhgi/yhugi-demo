package com.yuhgi.demo.fastjson;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.junit.Assert;
import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AppTest {
    private String jsonString = "{\"age\":3,\"birthdate\":1496738822842,\"name\":\"校长\",\"old\":true,\"salary\":123456789.0123}";
    private String jsonStringArray = "[{\"age\":3,\"birthdate\":1496738822842,\"name\":\"校长\",\"old\":true,\"salary\":123456789.0123}]";
    @Test
    public void parseObjectTest(){

        JSONObject jsonObject = JSON.parseObject(jsonString);
        Assert.assertEquals("校长",jsonObject.get("name"));

        User user = JSON.parseObject(jsonString,User.class);
        Assert.assertEquals("校长",user.getName());


        List<User> list = JSON.parseArray(jsonStringArray,User.class);
        Assert.assertEquals(1,list.size());
        Assert.assertEquals("校长",list.get(0).getName());
    }

    @Test
    public void toJsonStringTest(){
        User user1 = new User("张三",12,1000);
        User user2 = new User("李四",23,1000);
        User user3 = new User("王五",16,1000);
        String user1Str = JSON.toJSONString(user1);
        System.out.println(user1Str);
        List<User> list = new ArrayList<>();
        list.add(user1);
        list.add(user2);
        list.add(user3);
        String arrayStr = JSON.toJSONString(list);
        System.out.println(arrayStr);
    }

    @Test
    public void jsonFieldTest() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
        Date date = sdf.parse("20190701 18:10:09");
        Product product = new Product("牙刷",date,"牙刷1厂");
        String jsonStr = JSON.toJSONString(product);
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        Assert.assertEquals("牙刷",jsonObject.get("productName"));
        Assert.assertNull(jsonObject.get("factory"));
        Assert.assertEquals("20190701 18:10:09",jsonObject.get("productDate"));

        Product product1 = JSON.parseObject(jsonStr,Product.class);
        Assert.assertEquals(product,product1);
    }
}
