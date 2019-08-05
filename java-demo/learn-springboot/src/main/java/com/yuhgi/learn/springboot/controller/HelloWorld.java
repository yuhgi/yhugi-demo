package com.yuhgi.learn.springboot.controller;

import com.yuhgi.learn.springboot.config.ServerConfig;
import org.apache.catalina.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HelloWorld {
    @Value("${application.name}")
    private String name;

    @Autowired
    private ServerConfig servers;

    @RequestMapping("/")
    String home() {
        return "Hello "+name;
    }

    @RequestMapping("/servers")
    String servers(){
        return servers.toString();
    }
}