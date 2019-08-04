package com.yuhgi.learn.springboot.config;

import org.apache.catalina.Server;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ArrayList;

@Component
@ConfigurationProperties(prefix="application")
public class ServerConfig {
    private final List<String> servers = new ArrayList<String>();

    public List<String> getServers() {
        return this.servers;
    }
    @Override
    public String toString(){
        String str = "Servers:";
        for(String server:servers){
            str += server;
            str += " ";
        }
        return str;
    }
}
