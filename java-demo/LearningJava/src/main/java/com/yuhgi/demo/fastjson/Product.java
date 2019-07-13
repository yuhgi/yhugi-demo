package com.yuhgi.demo.fastjson;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

public class Product {
    static int cnt = 1;
    private int id;
    @JSONField(name="productName")
    private String name;
    @JSONField(name="productDate",format="yyyyMMdd HH:mm:ss")
    private Date date;
    @JSONField(serialize = false)
    private String factory;

    public String getFactory() {
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

    public Product( String name, Date date, String factory) {
        this.id = cnt++;
        this.name = name;
        this.date = date;
        this.factory = factory;
    }

    @JSONField(name="ID")
    public int getId() {
        return id;
    }
    @JSONField(name="ID")
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
